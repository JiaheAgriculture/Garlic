import { ShieldCheck } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { certificates } from '@/lib/data/site'

export function Certificates() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Certifications"
        title="Certified for Global Export"
        description="Our facilities and products meet the most demanding international food-safety and quality standards."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {certificates.map((cert) => (
          <Card key={cert.name} className="text-center transition-colors hover:border-primary/50">
            <CardContent className="flex flex-col items-center pt-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-sm font-bold">{cert.name}</h3>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                {cert.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
