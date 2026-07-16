'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  deletePost,
  togglePublished,
  type NewsInput,
} from '@/app/admin/actions/news'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'

export type AdminPost = NewsInput & {
  id: number
  publishedAt: Date | string
}

export function NewsList({ posts }: { posts: AdminPost[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingId, setPendingId] = useState<number | null>(null)

  function handleToggle(id: number, next: boolean) {
    setPendingId(id)
    startTransition(async () => {
      try {
        await togglePublished(id, next)
        toast.success(next ? 'Article published' : 'Article hidden')
        router.refresh()
      } catch {
        toast.error('Failed to update')
      }
    })
  }

  function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setPendingId(id)
    startTransition(async () => {
      try {
        await deletePost(id)
        toast.success('Article deleted')
        router.refresh()
      } catch {
        toast.error('Failed to delete')
      }
    })
  }

  if (posts.length === 0) {
    return (
      <Card className="p-10 text-center text-muted-foreground">
        No articles yet. Create your first one.
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{post.category}</Badge>
              {post.published ? (
                <Badge className="bg-primary/15 text-primary">Published</Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Draft
                </Badge>
              )}
            </div>
            <h3 className="mt-2 truncate font-medium text-foreground">
              {post.title}
            </h3>
            <p className="truncate text-sm text-muted-foreground">
              /news/{post.slug}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isPending && pendingId === post.id}
              onClick={() => handleToggle(post.id, !post.published)}
            >
              {post.published ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {post.published ? 'Hide' : 'Publish'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              render={<Link href={`/admin/news/${post.id}`} />}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              disabled={isPending && pendingId === post.id}
              onClick={() => handleDelete(post.id, post.title)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
