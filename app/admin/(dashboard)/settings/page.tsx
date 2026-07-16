import { getSiteSettings } from '@/lib/settings'
import { SettingsForm } from '@/components/admin/settings-form'
import { AdminPageHeader } from '@/components/admin/admin-page-header'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Settings"
        description="Control site availability, country access, and inquiry notifications."
      />
      <SettingsForm initial={settings} />
    </div>
  )
}
