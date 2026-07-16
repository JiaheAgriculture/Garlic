import { Award, Factory, FlaskConical, BadgeCheck, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { strengths } from '@/lib/data/site'

const icons: Record<string, LucideIcon> = {
  Award,
  Factory,
  FlaskConical,
  BadgeCheck,
}

export function StrengthCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {strengths.map((item) => {
          const Icon = icons[item.icon] ?? Award
          return (
            <Card key={item.title} className="transition-colors hover:border-primary/50">
              <CardContent className="pt-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
