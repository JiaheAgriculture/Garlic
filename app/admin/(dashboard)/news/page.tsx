import Link from 'next/link'
import { listAllPosts } from '@/app/admin/actions/news'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { NewsList, type AdminPost } from '@/components/admin/news-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminNewsPage() {
  const posts = await listAllPosts()

  const mapped: AdminPost[] = posts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    excerpt: p.excerpt,
    content: p.content,
    coverImage: p.coverImage,
    author: p.author,
    published: p.published,
    publishedAt: p.publishedAt,
  }))

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        title="News"
        description="Create, edit and publish articles for the public news page."
        action={
          <Button render={<Link href="/admin/news/new" />}>
            <Plus className="h-4 w-4" />
            New Article
          </Button>
        }
      />
      <NewsList posts={mapped} />
    </div>
  )
}
