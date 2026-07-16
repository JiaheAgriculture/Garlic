import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined

// Treat anything that isn't an explicit Vercel production deployment as a
// preview/dev environment (the v0 preview runs in an iframe on a dynamic
// origin, and NODE_ENV is not reliably "development" here).
const isProduction = process.env.VERCEL_ENV === 'production'

export const auth = betterAuth({
  database: pool,
  baseURL: process.env.BETTER_AUTH_URL ?? productionUrl,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  // In production, only trust the known deployment URLs. Everywhere else
  // (v0 preview / dev), trust the request's own origin so auth works on the
  // dynamic iframe origin without leaking cross-site trust in production.
  trustedOrigins: async (request?: Request) => {
    if (isProduction) {
      return [productionUrl, process.env.BETTER_AUTH_URL].filter(
        (v): v is string => Boolean(v),
      )
    }
    const origin = request?.headers.get('origin')
    return origin ? [origin] : ['*']
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  advanced: {
    // The v0 preview embeds the app in a cross-site iframe, so the session
    // cookie must be SameSite=None; Secure to be stored by the browser.
    ...(isProduction
      ? {}
      : {
          defaultCookieAttributes: {
            sameSite: 'none' as const,
            secure: true,
          },
        }),
  },
})
