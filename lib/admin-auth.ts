import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// Returns the current session or null. Safe to call anywhere on the server.
export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

// Guards admin pages. Redirects to the sign-in page when there is no session.
export async function requireAdmin() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/admin/sign-in')
  }
  return session
}
