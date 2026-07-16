export type Article = {
  slug: string
  title: string
  category: string
  date: string
  image: string
  excerpt: string
  content: string[]
}

export const articles: Article[] = [
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
