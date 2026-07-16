'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const config = {
  views: { label: 'Page Views', color: 'var(--chart-1)' },
  visitors: { label: 'Unique Visitors', color: 'var(--chart-3)' },
} satisfies ChartConfig

export function ViewsChart({
  data,
}: {
  data: { day: string; views: number; visitors: number }[]
}) {
  return (
    <ChartContainer config={config} className="h-[280px] w-full">
      <AreaChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={28}
          tickFormatter={(v: string) =>
            new Date(v).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            })
          }
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={32}
          allowDecimals={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0.03} />
          </linearGradient>
          <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-visitors)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-visitors)" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <Area
          dataKey="views"
          type="monotone"
          fill="url(#fillViews)"
          stroke="var(--color-views)"
          strokeWidth={2}
        />
        <Area
          dataKey="visitors"
          type="monotone"
          fill="url(#fillVisitors)"
          stroke="var(--color-visitors)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
