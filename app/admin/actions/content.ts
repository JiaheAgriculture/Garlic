'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { contentBlocks } from '@/lib/db/schema'
import { contentDefaults, type ContentKey } from '@/lib/content'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateContentBlock(
  key: ContentKey,
  values: Record<string, string>,
) {
  await requireAdmin()

  if (!(key in contentDefaults)) {
    throw new Error('Unknown content block')
  }

  // Only keep keys that exist in the defaults so unexpected fields are dropped.
  const allowed = Object.keys(contentDefaults[key])
  const clean: Record<string, string> = {}
  for (const field of allowed) {
    clean[field] = values[field] ?? ''
  }

  await db
    .insert(contentBlocks)
    .values({
      key,
      label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()),
      data: clean,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: contentBlocks.key,
      set: { data: clean, updatedAt: new Date() },
    })

  // Revalidate the public pages that consume content blocks.
  revalidatePath('/')
  revalidatePath('/admin/content')
  return { success: true }
}
