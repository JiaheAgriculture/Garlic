'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateContentBlock } from '@/app/admin/actions/content'

type Block = {
  key: string
  label: string
  values: Record<string, string>
}

// Fields rendered as multi-line textareas rather than single-line inputs.
const LONG_FIELDS = new Set(['subtitle', 'body', 'description'])

function fieldLabel(field: string) {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
}

function BlockCard({ block }: { block: Block }) {
  const [values, setValues] = useState(block.values)
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    try {
      await updateContentBlock(block.key as never, values)
      toast.success(`${block.label} updated`)
    } catch {
      toast.error('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{block.label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(values).map(([field, value]) => (
          <div key={field} className="space-y-1.5">
            <Label htmlFor={`${block.key}-${field}`}>{fieldLabel(field)}</Label>
            {LONG_FIELDS.has(field) ? (
              <Textarea
                id={`${block.key}-${field}`}
                value={value}
                rows={3}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field]: e.target.value }))
                }
              />
            ) : (
              <Input
                id={`${block.key}-${field}`}
                value={value}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field]: e.target.value }))
                }
              />
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ContentEditor({ blocks }: { blocks: Block[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {blocks.map((block) => (
        <BlockCard key={block.key} block={block} />
      ))}
    </div>
  )
}
