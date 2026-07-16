import { notFound } from 'next/navigation'
import { getPostById } from '@/app/admin/actions/news'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { NewsEditor } from '@/components/admin/news-editor'

export const dynamic = 'force-dynamic'

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const postId = Number(id)
  if (Number.isNaN(postId)) notFound()

  const post = await getPostById(postId)
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Edit Article"
        description="Update this article. Changes go live immediately when published."
      />
      <NewsEditor
        postId={post.id}
        initial={{
          title: post.title,
          slug: post.slug,
          category: post.category,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          author: post.author,
          published: post.published,
        }}
      />
    </div>
  )
}
