import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { InquiryCta } from '@/components/home/inquiry-cta'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/lib/data/site'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about ordering garlic: minimum order quantity, varieties and sizes, certifications, food safety, payment terms, lead time, shipping, samples and custom packaging.',
}

export default function FaqPage() {
  return (
    <main>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Answers to the most common questions from international garlic buyers. Can’t find what you need? Send us an inquiry."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <InquiryCta />
    </main>
  )
}
