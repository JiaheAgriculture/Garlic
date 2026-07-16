import type { Metadata } from 'next'
import Image from 'next/image'
import { Factory, FlaskConical, Globe2, Boxes, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { SectionHeading } from '@/components/section-heading'
import { Certificates } from '@/components/home/certificates'
import { InquiryCta } from '@/components/home/inquiry-cta'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about our garlic export factory: production scale, automated lines, in-house testing laboratory, ISO22000 and HACCP certifications, and our partnerships with global buyers.',
}

const facts = [
  { icon: Factory, value: '100,000T', label: 'Annual production capacity' },
  { icon: Globe2, value: '60+', label: 'Countries served' },
  { icon: FlaskConical, value: '400+', label: 'Pesticide residue tests' },
  { icon: Boxes, value: '30+', label: 'Years of experience' },
]

const capabilities = [
  {
    title: 'Factory Scale',
    description:
      'Located in China’s core garlic-producing region, our factory spans large-scale processing facilities supported by contracted farmland, giving us full control over volume and quality.',
  },
  {
    title: 'Automated Production Lines',
    description:
      'Modern automated lines handle sorting, grading, drying and packaging with consistency and efficiency, enabling an annual output of 100,000 tons.',
  },
  {
    title: 'In-House Testing Laboratory',
    description:
      'Our dedicated laboratory runs 400+ pesticide residue and quality tests to meet EU, US and global food-safety requirements before any shipment leaves the factory.',
  },
  {
    title: 'Global Buyer Partnerships',
    description:
      'We work with importers, wholesalers and food manufacturers across Europe, the Middle East, Southeast Asia and the Americas, with long-standing repeat partnerships.',
  },
]

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About Us"
        title="A Trusted Garlic Export Partner"
        description="Three decades of cultivation, processing and global trade — built on scale, certified quality and reliable supply."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/factory-aerial.png"
              alt="Aerial view of the garlic processing factory"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="From Field to Global Markets"
              description="We are a vertically integrated garlic export company, controlling every stage from cultivation to cold-chain shipping. This integration is the foundation of our consistent quality and competitive factory pricing."
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {facts.map((fact) => (
                <Card key={fact.label}>
                  <CardContent className="pt-2">
                    <fact.icon className="h-6 w-6 text-primary" />
                    <div className="mt-3 text-2xl font-bold">{fact.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {fact.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Capabilities"
            title="Built for Reliable Global Supply"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {capabilities.map((item) => (
              <Card key={item.title} className="transition-colors hover:border-primary/50">
                <CardContent className="pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Certificates />
      <InquiryCta />
    </main>
  )
}
