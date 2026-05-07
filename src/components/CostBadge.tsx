import type { AggregateCostBand } from '../types'
import { bandLabel } from '../utils/cost'

const COST_STYLES: Record<AggregateCostBand, string> = {
  low:
    'bg-emerald-50 text-emerald-900 ring-emerald-200/80 dark:bg-emerald-950/70 dark:text-emerald-100 dark:ring-emerald-700',
  medium:
    'bg-amber-50 text-amber-950 ring-amber-200/80 dark:bg-amber-950/55 dark:text-amber-100 dark:ring-amber-700',
  high:
    'bg-rose-50 text-rose-950 ring-rose-200/80 dark:bg-rose-950/55 dark:text-rose-100 dark:ring-rose-700',
}

export function CostBadge({ band }: { band: AggregateCostBand }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset ${COST_STYLES[band]}`}
    >
      {bandLabel(band)} cost posture
    </span>
  )
}
