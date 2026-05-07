import type { AggregateCostBand, CostTier, SelectionFieldId } from '../types'
import { getOptionByFieldAndId } from '../data/catalog'
import type { SelectionState } from '../types'

const TIER_SCORE: Record<CostTier, number> = {
  low: 1,
  medium: 2,
  high: 3,
}

/** Map aggregate score bucket to UX label. */
export function aggregateTierToBand(avg: number): AggregateCostBand {
  if (avg <= 1.4) return 'low'
  if (avg <= 2.2) return 'medium'
  return 'high'
}

export function computeAggregateCost(selections: SelectionState, fieldIds: SelectionFieldId[]): {
  band: AggregateCostBand
  average: number
  coverage: number
} {
  const scores: number[] = []
  for (const id of fieldIds) {
    const optId = selections[id]
    if (!optId) continue
    const opt = getOptionByFieldAndId(id, optId)
    if (opt) scores.push(TIER_SCORE[opt.costTier])
  }
  const coverage = fieldIds.length ? scores.length / fieldIds.length : 0
  if (scores.length === 0) {
    return { band: 'low', average: 1, coverage: 0 }
  }
  const average = scores.reduce((a, b) => a + b, 0) / scores.length
  return { band: aggregateTierToBand(average), average, coverage }
}

export function bandLabel(band: AggregateCostBand): string {
  switch (band) {
    case 'low':
      return 'Low'
    case 'medium':
      return 'Medium'
    case 'high':
      return 'High'
  }
}
