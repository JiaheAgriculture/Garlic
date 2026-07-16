import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// These are global, admin-managed website tables (not per-user data). Access
// is protected by requiring an authenticated admin session in every action.
// Column names here match the real DB columns (snake_case) created via MCP.

// Single-row site configuration (id is always 1).
export const siteSettings = pgTable('site_settings', {
  id: integer('id').primaryKey().default(1),
  siteEnabled: boolean('site_enabled').notNull().default(true),
  maintenanceMessage: text('maintenance_message')
    .notNull()
    .default('Our website is currently under maintenance. Please check back soon.'),
  // Comma-separated ISO 3166-1 alpha-2 country codes blocked from the site.
  blockedCountries: text('blocked_countries').notNull().default(''),
  inquiryEmail: text('inquiry_email').notNull().default(''),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Editable content blocks keyed by section name (e.g. "hero", "companyIntro").
export const contentBlocks = pgTable('content_blocks', {
  key: text('key').primaryKey(),
  label: text('label').notNull(),
  data: jsonb('data').$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// News / blog articles managed from the admin.
export const newsPosts = pgTable('news_posts', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull().default('Industry News'),
  excerpt: text('excerpt').notNull().default(''),
  content: text('content').notNull().default(''),
  coverImage: text('cover_image').notNull().default(''),
  author: text('author').notNull().default('Editorial Team'),
  published: boolean('published').notNull().default(true),
  publishedAt: timestamp('published_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Inquiries submitted through the public contact form.
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  company: text('company').notNull().default(''),
  name: text('name').notNull(),
  email: text('email').notNull(),
  country: text('country').notNull().default(''),
  product: text('product').notNull().default(''),
  quantity: text('quantity').notNull().default(''),
  message: text('message').notNull().default(''),
  status: text('status').notNull().default('new'), // new | read | replied | archived
  ipAddress: text('ip_address').notNull().default(''),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// One row per public page view, used for the analytics dashboard.
export const pageViews = pgTable('page_views', {
  id: serial('id').primaryKey(),
  path: text('path').notNull().default('/'),
  country: text('country').notNull().default(''),
  city: text('city').notNull().default(''),
  device: text('device').notNull().default(''), // Mobile | Desktop | Tablet
  browser: text('browser').notNull().default(''),
  os: text('os').notNull().default(''),
  referrer: text('referrer').notNull().default('Direct'),
  ipAddress: text('ip_address').notNull().default(''),
  visitorId: text('visitor_id').notNull().default(''),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
