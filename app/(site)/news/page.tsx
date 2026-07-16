import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { NewsCard } from '@/components/news-card'
import { InquiryCta } from '@/components/home/inquiry-cta'
import { getPublishedPosts } from '@/lib/news'

export const metadata: Metadata = {
  title: 'Industry News',
  description:
    'Garlic industry news and insights: harvest updates, global market trends, cold storage best practices and garlic cultivation know-how for international buyers.',
}

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const posts = await getPublishedPosts()

  return (
    <main>
      <PageHeader
        eyebrow="News"
        title="Garlic Industry News & Insights"
        description="Stay informed with harvest updates, market trends, storage guidance and cultivation know-how from our export team."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No articles have been published yet. Please check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      <InquiryCta />
    </main>
  )
}
