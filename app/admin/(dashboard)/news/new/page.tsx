import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { NewsEditor } from '@/components/admin/news-editor'

export default function NewArticlePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="New Article"
        description="Write a new article for the news page."
      />
      <NewsEditor />
    </div>
  )
}
