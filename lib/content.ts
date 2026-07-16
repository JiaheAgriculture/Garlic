import 'server-only'
import { db } from '@/lib/db'
import { contentBlocks } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export type HeroContent = {
  badge1: string
  badge2: string
  badge3: string
  badge4: string
  title: string
  subtitle: string
}

export type CompanyIntroContent = {
  eyebrow: string
  title: string
  body: string
  stat1Value: string
  stat1Label: string
  stat2Value: string
  stat2Label: string
}

export type InquiryCtaContent = {
  title: string
  description: string
}

export const contentDefaults = {
  hero: {
    badge1: '30 Years of Experience',
    badge2: '500,000 Tons Annual Output',
    badge3: '400+ Pesticide Residue Tests',
    badge4: 'Full International Certifications',
    title: 'Your Trusted Garlic Export Factory from China',
    subtitle:
      'Three decades of cultivation, processing and global export. We supply fresh white garlic, purple garlic, organic and processed garlic to buyers in over 60 countries — backed by full international certifications and rigorous food-safety testing.',
  } satisfies HeroContent,
  companyIntro: {
    eyebrow: 'About Our Factory',
    title: 'A Modern Garlic Export Company Built on Scale and Quality',
    body: 'Our company is located in the heart of China’s primary garlic production area, where ideal soil and climate produce firm, flavorful bulbs. With automated production lines and an annual capacity of 100,000 tons, we deliver consistent quality and reliable supply to partners worldwide.',
    stat1Value: '100,000 T',
    stat1Label: 'Annual Capacity',
    stat2Value: 'Global',
    stat2Label: 'Export Reach',
  } satisfies CompanyIntroContent,
  inquiryCta: {
    title: 'Ready to Source Premium Garlic at Factory Prices?',
    description:
      'Submit your procurement requirements and our export team will get back to you within 24 hours with a tailored quotation and product samples.',
  } satisfies InquiryCtaContent,
}

export type ContentKey = keyof typeof contentDefaults

// Reads a content block, merging DB overrides on top of defaults so a missing
// row or a missing field always falls back to a sensible value.
export async function getContent<K extends ContentKey>(
  key: K,
): Promise<(typeof contentDefaults)[K]> {
  try {
    const [row] = await db
      .select()
      .from(contentBlocks)
      .where(eq(contentBlocks.key, key))
      .limit(1)
    if (!row) return contentDefaults[key]
    return { ...contentDefaults[key], ...(row.data as object) }
  } catch {
    return contentDefaults[key]
  }
}

// Returns all editable blocks (with defaults merged) for the admin editor.
export async function getAllContent() {
  const rows = await db.select().from(contentBlocks)
  const byKey = new Map(rows.map((r) => [r.key, r.data as object]))
  return (Object.keys(contentDefaults) as ContentKey[]).map((key) => ({
    key,
    label:
      rows.find((r) => r.key === key)?.label ??
      key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()),
    values: { ...contentDefaults[key], ...(byKey.get(key) ?? {}) },
  }))
}
