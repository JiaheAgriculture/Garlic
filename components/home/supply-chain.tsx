import { SectionHeading } from '@/components/section-heading'
import { supplyChain } from '@/lib/data/site'

export function SupplyChain() {
  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Supply Chain"
          title="A Complete 7-Step Supply Chain"
          description="Full control from seed to shipment ensures the quality, safety and traceability of every garlic container we export."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supplyChain.map((step, index) => (
            <li
              key={step.step}
              className="relative rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {step.step}
                </span>
                {index < supplyChain.length - 1 && (
                  <span className="hidden h-px flex-1 bg-border lg:block" />
                )}
              </div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
