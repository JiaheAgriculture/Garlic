'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createPost, updatePost, type NewsInput } from '@/app/admin/actions/news'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

type Props = {
  postId?: number
  initial?: NewsInput
}

const CATEGORIES = ['Harvest', 'Market', 'Storage', 'Cultivation', 'Industry News']

export function NewsEditor({ postId, initial }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState<NewsInput>(
    initial ?? {
      title: '',
      slug: '',
      category: 'Industry News',
      excerpt: '',
      content: '',
      coverImage: '',
      author: 'Editorial Team',
      published: true,
    },
  )

  function set<K extends keyof NewsInput>(key: K, value: NewsInput[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      try {
        if (postId) {
          await updatePost(postId, form)
          toast.success('Article updated')
        } else {
          await createPost(form)
          toast.success('Article created')
        }
        router.push('/admin/news')
        router.refresh()
      } catch {
        toast.error('Failed to save article')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="flex flex-col gap-5 pt-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="Leave blank to auto-generate from title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="coverImage">Cover image URL</Label>
            <Input
              id="coverImage"
              value={form.coverImage}
              onChange={(e) => set('coverImage', e.target.value)}
              placeholder="/images/news-harvest.png or https://..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="excerpt">Excerpt (summary)</Label>
            <Textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              rows={2}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
              rows={12}
              required
              placeholder="Write the full article. Separate paragraphs with a blank line."
            />
            <p className="text-xs text-muted-foreground">
              Separate paragraphs with a blank line.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) => set('author', e.target.value)}
              />
            </div>
            <label className="flex items-center gap-3 self-end rounded-lg border border-border p-3">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => set('published', e.target.checked)}
                className="h-5 w-5 accent-[var(--primary)]"
              />
              <span className="text-sm text-foreground">
                Published (visible on the website)
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/news')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : postId ? 'Update Article' : 'Create Article'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
