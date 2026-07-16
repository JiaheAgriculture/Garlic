import 'server-only'
import { db } from '@/lib/db'
import { pageViews, inquiries } from '@/lib/db/schema'
import { sql, gte, desc, count } from 'drizzle-orm'

// Aggregated analytics for the admin dashboard. All queries are read-only.
export async function getAnalytics(days = 30) {
  const since = new Date()
  since.setDate(since.getDate() - (days - 1))
  since.setHours(0, 0, 0, 0)

  const [
    totalViews,
    uniqueVisitors,
    viewsInRange,
    inquiryCount,
    dailySeries,
    topCountries,
    topPages,
    deviceSplit,
    browserSplit,
    recentVisitors,
  ] = await Promise.all([
    db.select({ v: count() }).from(pageViews),
    db
      .select({ v: sql<number>`count(distinct ${pageViews.visitorId})` })
      .from(pageViews),
    db.select({ v: count() }).from(pageViews).where(gte(pageViews.createdAt, since)),
    db.select({ v: count() }).from(inquiries),
    db
      .select({
        day: sql<string>`to_char(${pageViews.createdAt}, 'YYYY-MM-DD')`,
        views: count(),
        visitors: sql<number>`count(distinct ${pageViews.visitorId})`,
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(sql`to_char(${pageViews.createdAt}, 'YYYY-MM-DD')`)
      .orderBy(sql`to_char(${pageViews.createdAt}, 'YYYY-MM-DD')`),
    db
      .select({ country: pageViews.country, views: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(pageViews.country)
      .orderBy(desc(count()))
      .limit(8),
    db
      .select({ path: pageViews.path, views: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(pageViews.path)
      .orderBy(desc(count()))
      .limit(8),
    db
      .select({ device: pageViews.device, views: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(pageViews.device),
    db
      .select({ browser: pageViews.browser, views: count() })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(pageViews.browser)
      .orderBy(desc(count()))
      .limit(6),
    db
      .select()
      .from(pageViews)
      .orderBy(desc(pageViews.createdAt))
      .limit(15),
  ])

  // Fill missing days with zeros so the chart is continuous.
  const seriesMap = new Map(dailySeries.map((d) => [d.day, d]))
  const series: { day: string; views: number; visitors: number }[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(since)
    d.setDate(since.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    const row = seriesMap.get(key)
    series.push({
      day: key,
      views: Number(row?.views ?? 0),
      visitors: Number(row?.visitors ?? 0),
    })
  }

  return {
    totalViews: Number(totalViews[0]?.v ?? 0),
    uniqueVisitors: Number(uniqueVisitors[0]?.v ?? 0),
    viewsInRange: Number(viewsInRange[0]?.v ?? 0),
    inquiryCount: Number(inquiryCount[0]?.v ?? 0),
    series,
    topCountries: topCountries.map((c) => ({
      label: c.country || 'Unknown',
      views: Number(c.views),
    })),
    topPages: topPages.map((p) => ({
      label: p.path || '/',
      views: Number(p.views),
    })),
    deviceSplit: deviceSplit.map((d) => ({
      label: d.device || 'Unknown',
      views: Number(d.views),
    })),
    browserSplit: browserSplit.map((b) => ({
      label: b.browser || 'Unknown',
      views: Number(b.views),
    })),
    recentVisitors,
  }
}
