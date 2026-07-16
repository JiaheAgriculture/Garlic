'use server'

import { db } from '@/lib/db'
import { siteSettings } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/admin-auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateSiteSettings(input: {
  siteEnabled: boolean
  maintenanceMessage: string
  blockedCountries: string
  inquiryEmail: string
}) {
  await requireAdmin()

  // Normalize the blocked-countries list to uppercase ISO codes.
  const normalized = input.blockedCountries
    .split(',')
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean)
    .join(',')

  await db
    .update(siteSettings)
    .set({
      siteEnabled: input.siteEnabled,
      maintenanceMessage: input.maintenanceMessage,
      blockedCountries: normalized,
      inquiryEmail: input.inquiryEmail.trim(),
      updatedAt: new Date(),
    })
    .where(eq(siteSettings.id, 1))

  revalidatePath('/', 'layout')
  revalidatePath('/admin/settings')
  return { ok: true }
}
