import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InquiryCta } from '@/components/home/inquiry-cta'
import { getPublishedPostBySlug, toParagraphs } from '@/lib/news'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  const paragraphs = toParagraphs(post.content)

  return (
    <main>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Button
          render={<Link href="/news" />}
          variant="ghost"
          className="mb-6 px-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Button>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="secondary">{post.category}</Badge>
          <time dateTime={new Date(post.publishedAt).toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
        </div>

        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        {post.coverImage && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-border">
            <Image
              src={post.coverImage || '/placeholder.svg'}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <InquiryCta />
    </main>
  )
}
