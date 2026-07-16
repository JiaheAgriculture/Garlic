import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import type { Product } from '@/lib/data/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group flex flex-col overflow-hidden pt-0 transition-colors hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 bg-background/80 text-foreground backdrop-blur">
          {product.category}
        </Badge>
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {product.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {spec.label}
              </dt>
              <dd className="font-medium">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
      <CardFooter>
        <Button
          render={
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}`}
            />
          }
          className="w-full"
        >
          Request a Quote
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
