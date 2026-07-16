import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

// Mounts Better Auth's sign-in / sign-up / session endpoints under
// /api/auth/*. Runs on the Node.js runtime because it uses the pg Pool.
export const runtime = 'nodejs'

export const { POST, GET } = toNextJsHandler(auth)
