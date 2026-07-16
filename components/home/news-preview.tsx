import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { NewsCard } from '@/components/news-card'
import { getPublishedPosts } from '@/lib/news'

export async function NewsPreview() {
  const latest = await getPublishedPosts(3)

  if (latest.length === 0) return null

  return (
    <section className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Industry News"
            title="Garlic Industry Insights"
            description="Harvest updates, market trends, storage tips and cultivation know-how for global garlic buyers."
            className="max-w-xl"
          />
          <Button render={<Link href="/news" />} variant="outline">
            All Articles
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
