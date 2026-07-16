'use client'

import { useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { products } from '@/lib/data/products'
import { submitInquiry } from '@/app/actions/public'

type Props = {
  defaultProduct?: string
}

export function InquiryForm({ defaultProduct }: Props) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [product, setProduct] = useState(defaultProduct ?? '')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setLoading(true)
    try {
      const res = await submitInquiry({
        name: String(formData.get('name') ?? ''),
        company: String(formData.get('company') ?? ''),
        email: String(formData.get('email') ?? ''),
        country: String(formData.get('country') ?? ''),
        product,
        quantity: String(formData.get('quantity') ?? ''),
        message: String(formData.get('message') ?? ''),
      })
      if (res.success) {
        setDone(true)
        form.reset()
        setProduct('')
        toast.success('Inquiry sent! We will reply within 24 hours.')
      } else {
        toast.error(res.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="mt-4 text-xl font-semibold">Thank you!</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Your inquiry has been received. Our export team will get back to you
          within 24 hours with a detailed quotation.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setDone(false)}
        >
          Send another inquiry
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Honeypot spam protection */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" required placeholder="John Smith" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" placeholder="Your company" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country / Region</Label>
          <Input id="country" name="country" placeholder="e.g. Germany" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="product">Product of Interest</Label>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger id="product">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.slug} value={p.name}>
                  {p.name}
                </SelectItem>
              ))}
              <SelectItem value="Other / Multiple">Other / Multiple</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Estimated Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            placeholder="e.g. 2 x 40ft containers"
          />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Please describe your procurement needs, target market, packaging and shipping requirements."
        />
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Inquiry'
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We respect your privacy. Your information is only used to respond to
        your inquiry — typically within 24 hours.
      </p>
    </form>
  )
}
