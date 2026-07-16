'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Mail, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { setInquiryStatus, deleteInquiry } from '@/app/admin/actions/inquiries'

export type Inquiry = {
  id: number
  company: string
  name: string
  email: string
  country: string
  product: string
  quantity: string
  message: string
  status: string
  ipAddress: string
  createdAt: Date
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-primary/15 text-primary border-primary/30',
  read: 'bg-muted text-muted-foreground border-border',
  replied: 'bg-chart-2/15 text-chart-2 border-chart-2/30',
  archived: 'bg-muted text-muted-foreground border-border',
}

export function InquiryList({ initial }: { initial: Inquiry[] }) {
  const [items, setItems] = useState(initial)
  const [openId, setOpenId] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const visible =
    filter === 'all' ? items : items.filter((i) => i.status === filter)

  async function changeStatus(id: number, status: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
    try {
      await setInquiryStatus(id, status)
    } catch {
      toast.error('Failed to update status')
    }
  }

  async function remove(id: number) {
    if (!confirm('Delete this inquiry permanently?')) return
    setItems((prev) => prev.filter((i) => i.id !== id))
    try {
      await deleteInquiry(id)
      toast.success('Inquiry deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  if (items.length === 0) {
    return (
      <Card className="p-10 text-center text-muted-foreground">
        No inquiries yet. Submissions from the contact form will appear here.
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <span className="ml-auto text-sm text-muted-foreground">
          {visible.length} of {items.length}
        </span>
      </div>

      {visible.map((inq) => {
        const open = openId === inq.id
        return (
          <Card key={inq.id} className="overflow-hidden p-0">
            <button
              className="flex w-full items-center gap-3 p-4 text-left"
              onClick={() => {
                setOpenId(open ? null : inq.id)
                if (!open && inq.status === 'new') changeStatus(inq.id, 'read')
              }}
            >
              <Badge
                variant="outline"
                className={STATUS_STYLES[inq.status] ?? ''}
              >
                {inq.status}
              </Badge>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {inq.name}
                  {inq.company ? ` · ${inq.company}` : ''}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {inq.product || 'General inquiry'} ·{' '}
                  {inq.country || 'Unknown'} ·{' '}
                  {new Date(inq.createdAt).toLocaleDateString()}
                </p>
              </div>
              {open ? (
                <ChevronUp className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0" />
              )}
            </button>

            {open && (
              <div className="border-t border-border bg-muted/30 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Detail label="Email" value={inq.email} />
                  <Detail label="Country" value={inq.country || '—'} />
                  <Detail label="Product" value={inq.product || '—'} />
                  <Detail label="Quantity" value={inq.quantity || '—'} />
                  <Detail label="IP Address" value={inq.ipAddress || '—'} />
                  <Detail
                    label="Received"
                    value={new Date(inq.createdAt).toLocaleString()}
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Message
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">
                    {inq.message}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Select
                    value={inq.status}
                    onValueChange={(v) => changeStatus(inq.id, v)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" render={<a href={`mailto:${inq.email}`} />}>
                    <Mail className="h-4 w-4" />
                    Reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => remove(inq.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 break-words text-sm">{value}</p>
    </div>
  )
}
