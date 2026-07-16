import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getContent } from '@/lib/content'

const highlights = [
  'Located in China’s core garlic-producing region',
  'Automated production lines, 100,000 tons annual capacity',
  'Exporting to buyers in over 60 countries',
  'Full traceability from field to container',
]

export async function CompanyIntro() {
  const intro = await getContent('companyIntro')

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
          <Image
            src="/images/factory-line.png"
            alt="Automated garlic processing line"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {intro.eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {intro.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {intro.body}
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <Button
            render={<Link href="/about" />}
            size="lg"
            className="mt-8"
          >
            View More
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
