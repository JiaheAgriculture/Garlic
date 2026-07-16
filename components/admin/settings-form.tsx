'use client'

import { useState, useTransition } from 'react'
import { updateSiteSettings } from '@/app/admin/actions/settings'
import type { SiteSettings } from '@/lib/settings'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Power, Globe, Mail } from 'lucide-react'

const COMMON_COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'IN', name: 'India' },
  { code: 'RU', name: 'Russia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'VN', name: 'Vietnam' },
]

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [siteEnabled, setSiteEnabled] = useState(initial.siteEnabled)
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    initial.maintenanceMessage,
  )
  const [blockedCountries, setBlockedCountries] = useState(
    initial.blockedCountries.join(', '),
  )
  const [inquiryEmail, setInquiryEmail] = useState(initial.inquiryEmail)
  const [isPending, startTransition] = useTransition()

  function toggleCountry(code: string) {
    const set = new Set(
      blockedCountries
        .split(',')
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean),
    )
    if (set.has(code)) set.delete(code)
    else set.add(code)
    setBlockedCountries(Array.from(set).join(', '))
  }

  function handleSave() {
    startTransition(async () => {
      try {
        await updateSiteSettings({
          siteEnabled,
          maintenanceMessage,
          blockedCountries,
          inquiryEmail,
        })
        toast.success('Settings saved')
      } catch {
        toast.error('Failed to save settings')
      }
    })
  }

  const activeCodes = new Set(
    blockedCountries
      .split(',')
      .map((c) => c.trim().toUpperCase())
      .filter(Boolean),
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Site status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5 text-primary" />
            Site Status
          </CardTitle>
          <CardDescription>
            Turn the public website on or off. When off, all visitors see a
            maintenance page while the admin panel stays accessible.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4">
            <span className="flex flex-col">
              <span className="font-medium text-foreground">
                {siteEnabled ? 'Website is Live' : 'Website is Closed'}
              </span>
              <span className="text-sm text-muted-foreground">
                {siteEnabled
                  ? 'Visitors can browse the site normally.'
                  : 'Visitors are redirected to the maintenance page.'}
              </span>
            </span>
            <input
              type="checkbox"
              checked={siteEnabled}
              onChange={(e) => setSiteEnabled(e.target.checked)}
              className="h-6 w-6 accent-[var(--primary)]"
            />
          </label>
          <div className="flex flex-col gap-2">
            <Label htmlFor="maintenanceMessage">Maintenance message</Label>
            <Textarea
              id="maintenanceMessage"
              value={maintenanceMessage}
              onChange={(e) => setMaintenanceMessage(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Geo blocking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Country Blocking
          </CardTitle>
          <CardDescription>
            Block visitors from specific countries by ISO code (e.g. US, RU).
            Blocking is enforced at the server for every request.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {COMMON_COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => toggleCountry(c.code)}
                className={
                  'rounded-full border px-3 py-1 text-sm transition-colors ' +
                  (activeCodes.has(c.code)
                    ? 'border-destructive bg-destructive/10 text-destructive'
                    : 'border-border text-muted-foreground hover:border-foreground/30')
                }
              >
                {c.name} ({c.code})
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="blockedCountries">
              Blocked country codes (comma-separated)
            </Label>
            <Input
              id="blockedCountries"
              value={blockedCountries}
              onChange={(e) => setBlockedCountries(e.target.value)}
              placeholder="e.g. US, RU, IN"
            />
          </div>
        </CardContent>
      </Card>

      {/* Inquiry email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Inquiry Notifications
          </CardTitle>
          <CardDescription>
            Email address that receives a notification whenever a new inquiry is
            submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="inquiryEmail">Notification email</Label>
            <Input
              id="inquiryEmail"
              type="email"
              value={inquiryEmail}
              onChange={(e) => setInquiryEmail(e.target.value)}
              placeholder="sales@yourcompany.com"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isPending} size="lg">
          {isPending ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
