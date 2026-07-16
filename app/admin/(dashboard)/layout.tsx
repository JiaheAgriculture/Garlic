import type React from 'react'
import { requireAdmin } from '@/lib/admin-auth'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export const metadata = { title: 'Admin' }

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAdmin()

  return (
    <div className="flex min-h-svh flex-col bg-muted md:flex-row">
      <AdminSidebar email={session.user.email} />
      <main className="flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
    </div>
  )
}
