import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getContent } from '@/lib/content'

export async function InquiryCta() {
  const cta = await getContent('inquiryCta')

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="overflow-hidden rounded-2xl border border-primary/30 bg-primary/10 px-6 py-12 text-center sm:px-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/40 px-3 py-1 text-xs font-semibold text-primary">
          <Clock className="h-3.5 w-3.5" />
          Reply within 24 hours
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {cta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          {cta.description}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
    </section>
  )
}
