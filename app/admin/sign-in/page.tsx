import { redirect } from 'next/navigation'
import { getSession } from '@/lib/admin-auth'
import { adminExists } from '@/app/admin/actions/auth'
import { AdminAuthForm } from '@/components/admin/admin-auth-form'

export const metadata = { title: 'Admin Sign In' }

export default async function AdminSignInPage() {
  const session = await getSession()
  if (session?.user) redirect('/admin')

  // If no admin exists yet, send the user to first-run setup.
  const exists = await adminExists()
  if (!exists) redirect('/admin/sign-up')

  return <AdminAuthForm mode="sign-in" />
}
