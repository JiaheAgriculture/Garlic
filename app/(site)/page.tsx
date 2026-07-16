import { Hero } from '@/components/home/hero'
import { StrengthCards } from '@/components/home/strength-cards'
import { ProductCategories } from '@/components/home/product-categories'
import { CompanyIntro } from '@/components/home/company-intro'
import { SupplyChain } from '@/components/home/supply-chain'
import { Certificates } from '@/components/home/certificates'
import { NewsPreview } from '@/components/home/news-preview'
import { InquiryCta } from '@/components/home/inquiry-cta'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StrengthCards />
      <ProductCategories />
      <CompanyIntro />
      <SupplyChain />
      <Certificates />
      <NewsPreview />
      <InquiryCta />
    </main>
  )
}
