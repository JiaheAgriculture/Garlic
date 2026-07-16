import { redirect } from 'next/navigation'
import { getSession } from '@/lib/admin-auth'
import { adminExists } from '@/app/admin/actions/auth'
import { AdminAuthForm } from '@/components/admin/admin-auth-form'

export const metadata = { title: 'Admin Setup' }

// First-run setup. Once an admin exists, this page is locked and redirects
// to sign-in so no one else can self-register an admin account.
export default async function AdminSignUpPage() {
  const session = await getSession()
  if (session?.user) redirect('/admin')

  const exists = await adminExists()
  if (exists) redirect('/admin/sign-in')

  return <AdminAuthForm mode="sign-up" />
}
