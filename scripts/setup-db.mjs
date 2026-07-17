import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const DDL = `
-- Better Auth tables (public schema, camelCase columns) ---------------------
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL DEFAULT false,
  "image" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY,
  "expiresAt" timestamp NOT NULL,
  "token" text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  "id" text PRIMARY KEY,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamp,
  "refreshTokenExpiresAt" timestamp,
  "scope" text,
  "password" text,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id" text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp DEFAULT now(),
  "updatedAt" timestamp DEFAULT now()
);

-- App tables (snake_case columns) -------------------------------------------
CREATE TABLE IF NOT EXISTS "site_settings" (
  "id" integer PRIMARY KEY DEFAULT 1,
  "site_enabled" boolean NOT NULL DEFAULT true,
  "maintenance_message" text NOT NULL DEFAULT 'Our website is currently under maintenance. Please check back soon.',
  "blocked_countries" text NOT NULL DEFAULT '',
  "inquiry_email" text NOT NULL DEFAULT '',
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "content_blocks" (
  "key" text PRIMARY KEY,
  "label" text NOT NULL,
  "data" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "news_posts" (
  "id" serial PRIMARY KEY,
  "slug" text NOT NULL UNIQUE,
  "title" text NOT NULL,
  "category" text NOT NULL DEFAULT 'Industry News',
  "excerpt" text NOT NULL DEFAULT '',
  "content" text NOT NULL DEFAULT '',
  "cover_image" text NOT NULL DEFAULT '',
  "author" text NOT NULL DEFAULT 'Editorial Team',
  "published" boolean NOT NULL DEFAULT true,
  "published_at" timestamp NOT NULL DEFAULT now(),
  "created_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "inquiries" (
  "id" serial PRIMARY KEY,
  "company" text NOT NULL DEFAULT '',
  "name" text NOT NULL,
  "email" text NOT NULL,
  "country" text NOT NULL DEFAULT '',
  "product" text NOT NULL DEFAULT '',
  "quantity" text NOT NULL DEFAULT '',
  "message" text NOT NULL DEFAULT '',
  "status" text NOT NULL DEFAULT 'new',
  "ip_address" text NOT NULL DEFAULT '',
  "created_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "page_views" (
  "id" serial PRIMARY KEY,
  "path" text NOT NULL DEFAULT '/',
  "country" text NOT NULL DEFAULT '',
  "city" text NOT NULL DEFAULT '',
  "device" text NOT NULL DEFAULT '',
  "browser" text NOT NULL DEFAULT '',
  "os" text NOT NULL DEFAULT '',
  "referrer" text NOT NULL DEFAULT 'Direct',
  "ip_address" text NOT NULL DEFAULT '',
  "visitor_id" text NOT NULL DEFAULT '',
  "created_at" timestamp NOT NULL DEFAULT now()
);
`

const articles = [
  {
    slug: 'new-season-garlic-harvest-2026',
    title: 'New Season Garlic Harvest Begins: What Global Buyers Should Know',
    category: 'Harvest',
    date: '2026-05-28',
    image: '/images/news-harvest.png',
    excerpt:
      'The 2026 garlic harvest has officially started in the core production region. Here is what importers can expect in terms of size, quality and pricing this season.',
    content: [
      'The new season garlic harvest has begun across the main production areas, with early indicators pointing to strong bulb size and excellent overall quality.',
      'Favorable weather throughout the growing season has resulted in firm bulbs with a higher proportion of 5.5cm and 6.0cm+ grades, which are in high demand among premium retail buyers.',
      'For importers planning their annual procurement, the start of harvest is the ideal time to lock in volume and secure preferred grades before peak shipping season. Our team recommends confirming contracts early to guarantee allocation.',
      'Contact our sales team for the latest fresh garlic offer sheet and updated FOB pricing.',
    ],
  },
  {
    slug: 'global-garlic-market-outlook',
    title: 'Global Garlic Market Outlook: Price Trends and Demand',
    category: 'Market',
    date: '2026-04-15',
    image: '/images/news-market.png',
    excerpt:
      'An overview of current global garlic price movements, export demand by region and what is driving the market this year.',
    content: [
      'Global garlic demand remains robust, driven by steady consumption in Europe, the Middle East, Southeast Asia and the Americas.',
      'Export prices have stabilized after seasonal fluctuations, with cold-storage stock helping to balance supply through the off-season. Buyers sourcing organic and specialty varieties continue to see premium pricing.',
      'Logistics and shipping availability remain key factors influencing landed cost. We advise buyers to plan shipments around peak periods and to consider consolidated container loads where possible.',
      'Our market team publishes regular updates to help partners make informed procurement decisions.',
    ],
  },
  {
    slug: 'garlic-cold-storage-best-practices',
    title: 'Cold Storage Best Practices for Long-Term Garlic Quality',
    category: 'Storage',
    date: '2026-03-10',
    image: '/images/news-storage.png',
    excerpt:
      'How temperature-controlled storage extends shelf life and preserves the flavor and firmness of fresh garlic for year-round supply.',
    content: [
      'Proper cold storage is essential to maintaining garlic quality between harvest seasons. Our facilities maintain precise temperature and humidity control to prevent sprouting and moisture loss.',
      'Garlic destined for long-term storage is dried to optimal moisture levels and graded before entering temperature-controlled rooms, ensuring consistent quality throughout the year.',
      'This year-round availability allows our partners to receive fresh, firm garlic even during the off-season, supporting stable retail and food-service supply chains.',
    ],
  },
  {
    slug: 'how-garlic-is-grown',
    title: 'From Clove to Bulb: How Quality Garlic Is Grown',
    category: 'Cultivation',
    date: '2026-02-02',
    image: '/images/news-planting.png',
    excerpt:
      'A look at the agricultural science behind high-quality garlic, from seed selection and planting to field management and harvest.',
    content: [
      'Quality garlic starts with quality seed cloves. We select healthy, disease-free cloves from our best bulbs to ensure strong, uniform plants.',
      'Scientific field management — including controlled irrigation, balanced fertilization and integrated pest management — is critical to producing large, firm bulbs that meet export standards.',
      'Timing the harvest at peak maturity is equally important. Harvesting too early or too late affects bulb size, flavor and storage life. Our agronomists monitor each field closely to determine the optimal harvest window.',
      'This commitment to agricultural best practices is the foundation of every container we ship.',
    ],
  },
]

async function main() {
  const client = await pool.connect()
  try {
    await client.query(DDL)
    console.log('[setup-db] Tables ensured.')

    // Seed the singleton site settings row.
    await client.query(
      `INSERT INTO "site_settings" ("id") VALUES (1) ON CONFLICT ("id") DO NOTHING`,
    )

    // Seed news posts (idempotent by slug).
    for (const a of articles) {
      await client.query(
        `INSERT INTO "news_posts"
           ("slug","title","category","excerpt","content","cover_image","author","published","published_at")
         VALUES ($1,$2,$3,$4,$5,$6,$7,true,$8)
         ON CONFLICT ("slug") DO NOTHING`,
        [
          a.slug,
          a.title,
          a.category,
          a.excerpt,
          a.content.join('\n\n'),
          a.image,
          'Editorial Team',
          new Date(a.date),
        ],
      )
    }
    console.log('[setup-db] Seed complete.')
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch((err) => {
  console.error('[setup-db] Failed:', err)
  process.exit(1)
})
