import { NextResponse, type NextRequest } from 'next/server'
import { getSiteSettings } from '@/lib/settings'

// Run on the Node.js runtime so we can use the pg Pool (Edge can't).
export const config = {
  runtime: 'nodejs',
  // Match everything except Next internals, the admin panel, the auth API,
  // the maintenance/blocked pages, and static assets.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|admin|api/auth|maintenance|blocked|images|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|txt|xml)$).*)',
  ],
}

export async function middleware(request: NextRequest) {
  let settings
  try {
    settings = await getSiteSettings()
  } catch {
    // If settings can't be read, fail open so the site stays available.
    return NextResponse.next()
  }

  // 1. Geo-block: reject visitors from blocked countries.
  const country = (
    request.headers.get('x-vercel-ip-country') ?? ''
  ).toUpperCase()
  if (country && settings.blockedCountries.includes(country)) {
    const url = request.nextUrl.clone()
    url.pathname = '/blocked'
    return NextResponse.rewrite(url)
  }

  // 2. Site closed: show the maintenance page to everyone (admins use /admin).
  if (!settings.siteEnabled) {
    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}
