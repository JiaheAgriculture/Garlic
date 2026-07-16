import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getContent } from '@/lib/content'

export async function Hero() {
  const hero = await getContent('hero')
  const badges = [hero.badge1, hero.badge2, hero.badge3, hero.badge4]

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-garlic-field.png"
          alt="Garlic farm field at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/80 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
              >
                {badge}
              </span>
            ))}
          </div>

          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="/contact" />}
              size="lg"
              className="h-12 px-6 text-base"
            >
              Send Inquiry
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              render={<Link href="/products" />}
              size="lg"
              variant="outline"
              className="h-12 px-6 text-base"
            >
              View Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
