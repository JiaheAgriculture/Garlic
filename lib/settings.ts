import { db } from '@/lib/db'
import { siteSettings } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export type SiteSettings = {
  siteEnabled: boolean
  maintenanceMessage: string
  blockedCountries: string[]
  inquiryEmail: string
}

// Reads the singleton site settings row (id = 1). Returns sane defaults if the
// row is somehow missing.
export async function getSiteSettings(): Promise<SiteSettings> {
  const [row] = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, 1))
    .limit(1)

  if (!row) {
    return {
      siteEnabled: true,
      maintenanceMessage:
        'Our website is currently under maintenance. Please check back soon.',
      blockedCountries: [],
      inquiryEmail: '',
    }
  }

  return {
    siteEnabled: row.siteEnabled,
    maintenanceMessage: row.maintenanceMessage,
    blockedCountries: row.blockedCountries
      ? row.blockedCountries
          .split(',')
          .map((c) => c.trim().toUpperCase())
          .filter(Boolean)
      : [],
    inquiryEmail: row.inquiryEmail,
  }
}
