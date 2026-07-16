'use server'

import { db } from '@/lib/db'
import { inquiries, pageViews } from '@/lib/db/schema'
import { getSiteSettings } from '@/lib/settings'
import { headers } from 'next/headers'

type InquiryInput = {
  name: string
  company?: string
  email: string
  country?: string
  product?: string
  quantity?: string
  message: string
}

export async function submitInquiry(input: InquiryInput) {
  // Basic server-side validation.
  if (!input.name?.trim() || !input.email?.trim() || !input.message?.trim()) {
    return { success: false, error: 'Please fill in all required fields.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const h = await headers()
  const ip =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    ''
  const country = h.get('x-vercel-ip-country') || input.country || ''

  try {
    await db.insert(inquiries).values({
      name: input.name.trim(),
      company: input.company?.trim() ?? '',
      email: input.email.trim(),
      country,
      product: input.product?.trim() ?? '',
      quantity: input.quantity?.trim() ?? '',
      message: input.message.trim(),
      ipAddress: ip,
    })
  } catch {
    return { success: false, error: 'Could not submit inquiry. Please try again.' }
  }

  // Best-effort email notification. Only runs if RESEND_API_KEY is configured
  // and an inquiry email has been set in the admin. Never blocks the response.
  void notifyByEmail(input, country).catch(() => {})

  return { success: true }
}

async function notifyByEmail(input: InquiryInput, country: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return
  const settings = await getSiteSettings()
  const to = settings.inquiryEmail?.trim()
  if (!to) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Garlic Website <onboarding@resend.dev>',
      to: [to],
      subject: `New Garlic Inquiry from ${input.name}`,
      text: [
        `Name: ${input.name}`,
        `Company: ${input.company ?? ''}`,
        `Email: ${input.email}`,
        `Country: ${country}`,
        `Product: ${input.product ?? ''}`,
        `Quantity: ${input.quantity ?? ''}`,
        '',
        input.message,
      ].join('\n'),
    }),
  })
}

// Lightweight view tracking, called from the client on each public page load.
export async function trackPageView(payload: {
  path: string
  referrer?: string
  device?: string
  browser?: string
  os?: string
  visitorId?: string
}) {
  const h = await headers()
  const ip =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    ''
  const country = h.get('x-vercel-ip-country') || ''
  const city = h.get('x-vercel-ip-city') || ''

  try {
    await db.insert(pageViews).values({
      path: payload.path || '/',
      country,
      city: city ? decodeURIComponent(city) : '',
      device: payload.device ?? '',
      browser: payload.browser ?? '',
      os: payload.os ?? '',
      referrer: payload.referrer || 'Direct',
      ipAddress: ip,
      visitorId: payload.visitorId ?? '',
    })
  } catch {
    // Analytics must never break the page.
  }
  return { success: true }
}
