'use client'

import { useSearchParams } from 'next/navigation'
import { InquiryForm } from '@/components/inquiry-form'

export function ContactFormSection() {
  const searchParams = useSearchParams()
  const product = searchParams.get('product') ?? undefined
  return <InquiryForm defaultProduct={product} />
}
