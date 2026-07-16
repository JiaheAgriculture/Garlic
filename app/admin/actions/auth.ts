'use server'

import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'

// True when at least one admin account already exists. Used to lock down
// the sign-up page so only the first admin can self-register.
export async function adminExists(): Promise<boolean> {
  const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(user)
  return (row?.count ?? 0) > 0
}
