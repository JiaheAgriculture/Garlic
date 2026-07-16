import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { NewsPost } from '@/lib/news'

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Card className="group flex flex-col overflow-hidden pt-0 transition-colors hover:border-primary/50">
      <Link
        href={`/news/${post.slug}`}
        className="relative aspect-[16/10] overflow-hidden bg-muted"
      >
        <Image
          src={post.coverImage || '/placeholder.svg'}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <CardContent className="flex-1 pt-2">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Badge variant="secondary">{post.category}</Badge>
          <time dateTime={new Date(post.publishedAt).toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug">
          <Link href={`/news/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/news/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
