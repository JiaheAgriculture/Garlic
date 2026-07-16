import type React from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { ViewTracker } from '@/components/view-tracker'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ViewTracker />
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
