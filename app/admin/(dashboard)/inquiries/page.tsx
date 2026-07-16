import { listInquiries } from '@/app/admin/actions/inquiries'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { InquiryList } from '@/components/admin/inquiry-list'

export const dynamic = 'force-dynamic'

export default async function InquiriesPage() {
  const items = await listInquiries()

  return (
    <div>
      <AdminPageHeader
        title="Inquiries"
        description="All inquiries submitted through the website contact form."
      />
      <InquiryList initial={items} />
    </div>
  )
}
