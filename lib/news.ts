import { db } from '@/lib/db'
import { newsPosts } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'

export type NewsPost = typeof newsPosts.$inferSelect

// Published articles for the public site, newest first.
export async function getPublishedPosts(limit?: number): Promise<NewsPost[]> {
  const q = db
    .select()
    .from(newsPosts)
    .where(eq(newsPosts.published, true))
    .orderBy(desc(newsPosts.publishedAt))
  if (limit) return q.limit(limit)
  return q
}

// A single published article by slug (for the public detail page).
export async function getPublishedPostBySlug(
  slug: string,
): Promise<NewsPost | null> {
  const [row] = await db
    .select()
    .from(newsPosts)
    .where(and(eq(newsPosts.slug, slug), eq(newsPosts.published, true)))
    .limit(1)
  return row ?? null
}

// Splits stored content into paragraphs for rendering.
export function toParagraphs(content: string): string[] {
  return content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}
