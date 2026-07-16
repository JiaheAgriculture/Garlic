import { getAllContent } from '@/lib/content'
import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { ContentEditor } from '@/components/admin/content-editor'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  const blocks = await getAllContent()

  return (
    <div>
      <AdminPageHeader
        title="Content"
        description="Edit the copy shown across the public homepage. Changes go live immediately."
      />
      <ContentEditor blocks={blocks} />
    </div>
  )
}
