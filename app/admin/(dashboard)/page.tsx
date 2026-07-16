import Link from 'next/link'
import { Eye, Users, MousePointerClick, Mail } from 'lucide-react'
import { getAnalytics } from '@/lib/analytics'
import { getSiteSettings } from '@/lib/settings'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { ViewsChart } from '@/components/admin/views-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

const numberFmt = new Intl.NumberFormat('en-US')

export default async function DashboardPage() {
  const [a, settings] = await Promise.all([getAnalytics(30), getSiteSettings()])

  const stats = [
    { label: 'Total Page Views', value: a.totalViews, icon: Eye },
    { label: 'Unique Visitors', value: a.uniqueVisitors, icon: Users },
    { label: 'Views (30 days)', value: a.viewsInRange, icon: MousePointerClick },
    { label: 'Total Inquiries', value: a.inquiryCount, icon: Mail },
  ]

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Real-time overview of website traffic and visitor insights."
      />

      {!settings.siteEnabled && (
        <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Your website is currently <strong>closed</strong> to the public.
          Visitors see the maintenance page.{' '}
          <Link href="/admin/settings" className="underline">
            Manage in Settings
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums">
                  {numberFmt.format(s.value)}
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Traffic — Last 30 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <ViewsChart data={a.series} />
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BreakdownCard title="Top Countries" rows={a.topCountries} />
        <BreakdownCard title="Top Pages" rows={a.topPages} />
        <BreakdownCard title="Devices" rows={a.deviceSplit} />
        <BreakdownCard title="Browsers" rows={a.browserSplit} />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Recent Visitors</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium">Country</th>
                  <th className="px-5 py-3 font-medium">City</th>
                  <th className="px-5 py-3 font-medium">Page</th>
                  <th className="px-5 py-3 font-medium">Device</th>
                  <th className="px-5 py-3 font-medium">Browser</th>
                  <th className="px-5 py-3 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {a.recentVisitors.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-8 text-center text-muted-foreground"
                    >
                      No visits recorded yet.
                    </td>
                  </tr>
                ) : (
                  a.recentVisitors.map((v) => (
                    <tr key={v.id} className="border-b border-border/60">
                      <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">
                        {new Date(v.createdAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant="outline">{v.country || 'Unknown'}</Badge>
                      </td>
                      <td className="px-5 py-3">{v.city || '—'}</td>
                      <td className="px-5 py-3 font-mono text-xs">{v.path}</td>
                      <td className="px-5 py-3">{v.device || '—'}</td>
                      <td className="px-5 py-3">{v.browser || '—'}</td>
                      <td className="max-w-[160px] truncate px-5 py-3 text-muted-foreground">
                        {v.referrer || 'Direct'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BreakdownCard({
  title,
  rows,
}: {
  title: string
  rows: { label: string; views: number }[]
}) {
  const max = Math.max(1, ...rows.map((r) => r.views))
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        ) : (
          rows.map((r) => (
            <div key={r.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="truncate">{r.label}</span>
                <span className="tabular-nums text-muted-foreground">
                  {numberFmt.format(r.views)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(r.views / max) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
