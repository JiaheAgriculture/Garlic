'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { inquiries } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function listInquiries() {
  await requireAdmin()
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt))
}

export async function setInquiryStatus(id: number, status: string) {
  await requireAdmin()
  await db.update(inquiries).set({ status }).where(eq(inquiries.id, id))
  revalidatePath('/admin/inquiries')
  return { success: true }
}

export async function deleteInquiry(id: number) {
  await requireAdmin()
  await db.delete(inquiries).where(eq(inquiries.id, id))
  revalidatePath('/admin/inquiries')
  return { success: true }
}
