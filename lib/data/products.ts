export type Product = {
  slug: string
  name: string
  category: string
  image: string
  shortDescription: string
  specs: { label: string; value: string }[]
}

export const productCategories = [
  {
    slug: 'normal-white-garlic',
    name: 'Normal White Garlic',
    image: '/images/normal-white-garlic.png',
    description:
      'Standard fresh white garlic with firm bulbs and pungent flavor. The most widely exported variety, available in 4.5-6.5cm sizes.',
  },
  {
    slug: 'pure-white-garlic',
    name: 'Pure White Garlic',
    image: '/images/pure-white-garlic.png',
    description:
      'Premium pure white garlic with pristine skin and uniform bulbs. Ideal for retail and high-end markets.',
  },
  {
    slug: 'purple-garlic',
    name: 'Purple Garlic',
    image: '/images/purple-garlic.png',
    description:
      'Violet-streaked skin with a rich, robust taste. Popular in European and Middle Eastern markets.',
  },
  {
    slug: 'special-variety-garlic',
    name: 'Special Variety Garlic',
    image: '/images/organic-garlic.png',
    description:
      'Includes Organic Garlic, Non-GMO Garlic and Solo Garlic. Specialty produce for premium and health-focused buyers.',
  },
  {
    slug: 'processed-garlic',
    name: 'Processed Garlic',
    image: '/images/peeled-garlic.png',
    description:
      'Includes Peeled Garlic and Garlic Flakes. Value-added products ready for food service and manufacturing.',
  },
]

export const products: Product[] = [
  {
    slug: 'white-garlic-5-6cm',
    name: 'White Garlic 5-6cm',
    category: 'Fresh White Garlic',
    image: '/images/normal-white-garlic.png',
    shortDescription:
      'Premium-grade fresh white garlic with large, firm bulbs and strong pungent aroma. Export standard.',
    specs: [
      { label: 'Size', value: '5.0 - 6.0 cm' },
      { label: 'Packing', value: '10kg mesh bag / carton' },
      { label: 'Moisture', value: 'Sun-dried' },
      { label: 'MOQ', value: '1 x 20ft container' },
    ],
  },
  {
    slug: 'pure-white-garlic-6cm',
    name: 'Pure White Garlic 6cm+',
    category: 'Fresh White Garlic',
    image: '/images/pure-white-garlic.png',
    shortDescription:
      'Top-tier pure white garlic with spotless skin and uniform shape, perfect for premium retail packaging.',
    specs: [
      { label: 'Size', value: '6.0 cm +' },
      { label: 'Packing', value: 'Custom retail / bulk' },
      { label: 'Moisture', value: 'Sun-dried' },
      { label: 'MOQ', value: '1 x 20ft container' },
    ],
  },
  {
    slug: 'purple-garlic',
    name: 'Purple Skin Garlic',
    category: 'Fresh Garlic',
    image: '/images/purple-garlic.png',
    shortDescription:
      'Robust purple-skin garlic with intense flavor, favored in European and Middle Eastern cuisine.',
    specs: [
      { label: 'Size', value: '4.5 - 6.0 cm' },
      { label: 'Packing', value: '5kg / 10kg mesh bag' },
      { label: 'Moisture', value: 'Sun-dried' },
      { label: 'MOQ', value: '1 x 20ft container' },
    ],
  },
  {
    slug: 'organic-garlic',
    name: 'Organic Garlic',
    category: 'Special Variety',
    image: '/images/organic-garlic.png',
    shortDescription:
      'EU & USDA certified organic garlic grown without synthetic pesticides. Non-GMO and fully traceable.',
    specs: [
      { label: 'Size', value: '4.5 - 6.0 cm' },
      { label: 'Certification', value: 'EU / USDA Organic' },
      { label: 'Type', value: 'Non-GMO' },
      { label: 'MOQ', value: '1 x 20ft container' },
    ],
  },
  {
    slug: 'black-solo-garlic',
    name: 'Black Solo Garlic',
    category: 'Special Variety',
    image: '/images/black-solo-garlic.png',
    shortDescription:
      'Single-clove fermented black garlic with sweet, umami flavor. A gourmet specialty product.',
    specs: [
      { label: 'Type', value: 'Fermented Solo' },
      { label: 'Packing', value: 'Retail jars / bulk' },
      { label: 'Shelf Life', value: '12 months' },
      { label: 'MOQ', value: 'Negotiable' },
    ],
  },
  {
    slug: 'multi-clove-white-garlic',
    name: 'Multi-Clove White Garlic',
    category: 'Fresh White Garlic',
    image: '/images/pure-white-garlic.png',
    shortDescription:
      'Classic multi-clove white garlic with reliable yield and balanced flavor for everyday culinary use.',
    specs: [
      { label: 'Size', value: '4.5 - 5.5 cm' },
      { label: 'Cloves', value: '10 - 14 per bulb' },
      { label: 'Moisture', value: 'Sun-dried' },
      { label: 'MOQ', value: '1 x 20ft container' },
    ],
  },
  {
    slug: 'peeled-garlic',
    name: 'Peeled Garlic Cloves',
    category: 'Processed Garlic',
    image: '/images/peeled-garlic.png',
    shortDescription:
      'Fresh peeled garlic cloves, vacuum or modified-atmosphere packed for food service and processing.',
    specs: [
      { label: 'Type', value: 'Fresh Peeled' },
      { label: 'Packing', value: 'Vacuum / MAP' },
      { label: 'Shelf Life', value: '90 days chilled' },
      { label: 'MOQ', value: 'Negotiable' },
    ],
  },
  {
    slug: 'garlic-flake',
    name: 'Dehydrated Garlic Flakes',
    category: 'Processed Garlic',
    image: '/images/garlic-flake.png',
    shortDescription:
      'Dehydrated garlic flakes with long shelf life for seasoning, food manufacturing and export.',
    specs: [
      { label: 'Type', value: 'Dehydrated' },
      { label: 'Moisture', value: '< 6%' },
      { label: 'Packing', value: '20kg carton' },
      { label: 'MOQ', value: 'Negotiable' },
    ],
  },
]
