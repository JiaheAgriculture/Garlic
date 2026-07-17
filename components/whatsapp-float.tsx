'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { siteConfig } from '@/lib/data/site'

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false)
  const href = `https://wa.me/${siteConfig.whatsappNumber}`

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-4">
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp chat"
          className="w-[320px] max-w-[calc(100vw-2.5rem)] origin-bottom-right animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-black/30"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
              <MessageCircle className="h-6 w-6" fill="currentColor" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold leading-tight text-card-foreground">
                {siteConfig.name} Trade Team
              </p>
              <p className="text-sm font-medium text-[#25D366]">
                Typically replies within 1 hour
              </p>
            </div>
          </div>

          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Interested in our products? Chat with us for a quotation &amp; spec sheet.
          </p>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#1fb955] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <MessageCircle className="h-5 w-5" fill="currentColor" />
            Chat on WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 w-full rounded-md py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Dismiss
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat with us on WhatsApp'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {open ? (
          <X className="h-7 w-7" />
        ) : (
          <MessageCircle className="h-7 w-7" fill="currentColor" />
        )}
        <span className="sr-only">WhatsApp</span>
      </button>
    </div>
  )
}
