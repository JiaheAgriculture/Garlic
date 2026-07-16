import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { ContactFormSection } from '@/components/contact-form-section'
import { siteConfig } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'Contact Us — Request a Garlic Quote',
  description:
    'Send your garlic procurement inquiry to our export team. Fill in your requirements and get a tailored quotation within 24 hours.',
  alternates: { canonical: '/contact' },
}

const contactItems = [
  { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
  { icon: MessageCircle, label: 'WhatsApp', value: siteConfig.whatsapp, href: undefined },
  { icon: MapPin, label: 'Address', value: siteConfig.address, href: undefined },
]

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Get in Touch"
        title="Send Your Inquiry"
        description="Tell us about your procurement needs and our export team will reply within 24 hours with a detailed quotation, samples and shipping options."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Reach out through any channel below, or submit the inquiry form and
              we will get back to you promptly.
            </p>

            <ul className="mt-8 space-y-6">
              {contactItems.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-sm font-medium">
                        {item.value}
                      </span>
                    </span>
                  </>
                )
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-4 transition-colors hover:text-primary"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">24-hour response.</span> Our
                export team monitors inquiries during global business hours and
                replies within one working day.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={null}>
              <ContactFormSection />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
