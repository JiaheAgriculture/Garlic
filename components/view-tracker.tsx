'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/app/actions/public'

function detectDevice(ua: string) {
  if (/Tablet|iPad/i.test(ua)) return 'Tablet'
  if (/Mobi|Android|iPhone/i.test(ua)) return 'Mobile'
  return 'Desktop'
}

function detectBrowser(ua: string) {
  if (/Edg\//i.test(ua)) return 'Edge'
  if (/OPR\/|Opera/i.test(ua)) return 'Opera'
  if (/Chrome\//i.test(ua)) return 'Chrome'
  if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) return 'Safari'
  if (/Firefox\//i.test(ua)) return 'Firefox'
  return 'Other'
}

function detectOS(ua: string) {
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Mac OS X/i.test(ua)) return 'macOS'
  if (/Android/i.test(ua)) return 'Android'
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS'
  if (/Linux/i.test(ua)) return 'Linux'
  return 'Other'
}

function getVisitorId() {
  try {
    let id = localStorage.getItem('vid')
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem('vid', id)
    }
    return id
  } catch {
    return ''
  }
}

export function ViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const ua = navigator.userAgent
    void trackPageView({
      path: pathname,
      referrer: document.referrer || 'Direct',
      device: detectDevice(ua),
      browser: detectBrowser(ua),
      os: detectOS(ua),
      visitorId: getVisitorId(),
    })
  }, [pathname])

  return null
}
