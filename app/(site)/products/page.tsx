import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ProductCard } from '@/components/product-card'
import { InquiryCta } from '@/components/home/inquiry-cta'
import { products } from '@/lib/data/products'

export const metadata: Metadata = {
  title: 'Garlic Products',
  description:
    'Explore our full range of fresh and processed garlic for export: white garlic 5-6cm, purple skin garlic, organic garlic, black solo garlic, multi-clove white garlic, peeled garlic and dehydrated garlic flakes.',
}

export default function ProductsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Products"
        title="Fresh & Processed Garlic for Export"
        description="Browse our complete product range. Every product is graded to export standards and available in custom packaging. Request a quote on any item below."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <InquiryCta />
    </main>
  )
}
