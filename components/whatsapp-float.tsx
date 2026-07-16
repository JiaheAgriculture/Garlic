import { MessageCircle } from 'lucide-react'
import { siteConfig } from '@/lib/data/site'

export function WhatsAppFloat() {
  const href = `https://wa.me/${siteConfig.whatsappNumber}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
      <span className="sr-only">WhatsApp</span>
    </a>
  )
}
