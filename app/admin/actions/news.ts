'use server'

import { db } from '@/lib/db'
import { newsPosts } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/admin-auth'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export type NewsInput = {
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  published: boolean
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// All posts (published + drafts) for the admin list.
export async function listAllPosts() {
  await requireAdmin()
  return db.select().from(newsPosts).orderBy(desc(newsPosts.publishedAt))
}

export async function getPostById(id: number) {
  await requireAdmin()
  const [row] = await db
    .select()
    .from(newsPosts)
    .where(eq(newsPosts.id, id))
    .limit(1)
  return row ?? null
}

export async function createPost(input: NewsInput) {
  await requireAdmin()
  const slug = input.slug ? slugify(input.slug) : slugify(input.title)
  await db.insert(newsPosts).values({
    title: input.title,
    slug,
    category: input.category,
    excerpt: input.excerpt,
    content: input.content,
    coverImage: input.coverImage,
    author: input.author || 'Editorial Team',
    published: input.published,
  })
  revalidatePath('/admin/news')
  revalidatePath('/news')
  revalidatePath('/')
  return { ok: true }
}

export async function updatePost(id: number, input: NewsInput) {
  await requireAdmin()
  const slug = input.slug ? slugify(input.slug) : slugify(input.title)
  await db
    .update(newsPosts)
    .set({
      title: input.title,
      slug,
      category: input.category,
      excerpt: input.excerpt,
      content: input.content,
      coverImage: input.coverImage,
      author: input.author || 'Editorial Team',
      published: input.published,
    })
    .where(eq(newsPosts.id, id))
  revalidatePath('/admin/news')
  revalidatePath('/news')
  revalidatePath(`/news/${slug}`)
  revalidatePath('/')
  return { ok: true }
}

export async function togglePublished(id: number, published: boolean) {
  await requireAdmin()
  await db.update(newsPosts).set({ published }).where(eq(newsPosts.id, id))
  revalidatePath('/admin/news')
  revalidatePath('/news')
  revalidatePath('/')
  return { ok: true }
}

export async function deletePost(id: number) {
  await requireAdmin()
  await db.delete(newsPosts).where(eq(newsPosts.id, id))
  revalidatePath('/admin/news')
  revalidatePath('/news')
  revalidatePath('/')
  return { ok: true }
}
