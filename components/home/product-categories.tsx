import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { SectionHeading } from '@/components/section-heading'
import { productCategories } from '@/lib/data/products'

export function ProductCategories() {
  return (
    <section id="products" className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Our Products"
          title="A Full Range of Garlic Products"
          description="From standard fresh white garlic to specialty and processed products, we cover every requirement of the global garlic trade."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((cat) => (
            <Card
              key={cat.slug}
              className="group flex flex-col overflow-hidden pt-0 transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={cat.image || '/placeholder.svg'}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex-1 pt-2">
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cat.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  render={<Link href="/products" />}
                  variant="ghost"
                  className="px-0 text-primary hover:bg-transparent hover:text-primary/80"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
