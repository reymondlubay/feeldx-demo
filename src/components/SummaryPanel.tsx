import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { getOptionByFieldAndId, getRoomDefinition } from '../data/catalog'
import type { RoomType, SelectionFieldId, SelectionState } from '../types'
import { bandLabel, computeAggregateCost } from '../utils/cost'
import { getLiveWarningsAndTips } from '../utils/liveSignals'
import { Badge } from './Badge'
import { CostBadge } from './CostBadge'

interface SummaryPanelProps {
  room: RoomType
  selections: SelectionState
}

function labelFor(room: RoomType, fieldId: SelectionFieldId) {
  return getRoomDefinition(room).fields.find((f) => f.id === fieldId)?.label ?? fieldId
}

/** At `lg+`, `top` / `max-h` track measured header via `--feeldx-sticky-summary-top` (Header + ResizeObserver). Mobile is in-flow only so the panel does not float over the form. */
const SUMMARY_ASIDE_CLASS =
  'order-1 self-start lg:order-2 flex w-full shrink-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-md shadow-slate-200/40 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-slate-950/40 lg:sticky lg:top-[var(--feeldx-sticky-summary-top)] lg:z-30 lg:max-h-[calc(100dvh_-_var(--feeldx-sticky-summary-top)_-_0.75rem)] lg:overflow-y-auto lg:overscroll-y-contain'

export function SummaryPanel({ room, selections }: SummaryPanelProps) {
  const def = useMemo(() => getRoomDefinition(room), [room])
  const fieldIds = def.fields.map((f) => f.id)
  const { band, coverage } = computeAggregateCost(selections, fieldIds)
  const { warnings, tips } = getLiveWarningsAndTips(room, selections)

  const rows = fieldIds.map((id) => {
    const sel = selections[id]
    const opt = sel ? getOptionByFieldAndId(id, sel) : undefined
    return {
      id,
      title: labelFor(room, id),
      value: opt?.label ?? '—',
      tier: opt?.costTier,
    }
  })

  const complete = fieldIds.filter((id) => Boolean(selections[id])).length
  const progress = fieldIds.length ? Math.round((complete / fieldIds.length) * 100) : 0

  return (
    <motion.aside layout className={SUMMARY_ASIDE_CLASS}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Live summary
          </h2>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">{def.title}</p>
        </div>
        <CostBadge band={band} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
          <span>Selection coverage</span>
          <span>
            {complete}/{fieldIds.length} · {bandLabel(band)} band
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Relative cost estimate from mock tiers only (coverage {Math.round(coverage * 100)}%).
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Selections</h3>
        <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/60 dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800/50">
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex items-start justify-between gap-3 px-3 py-2.5 text-sm"
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-800 dark:text-slate-100">{row.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">{row.value}</p>
              </div>
              {row.tier && (
                <Badge
                  variant={
                    row.tier === 'high' ? 'warning' : row.tier === 'medium' ? 'default' : 'success'
                  }
                >
                  {row.tier}
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </div>

      {(warnings.length > 0 || tips.length > 0) && (
        <div className="space-y-3">
          {warnings.length > 0 && (
            <div className="rounded-xl border border-amber-300/80 bg-amber-50/90 p-3 dark:border-amber-700 dark:bg-amber-950/50">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-900 dark:text-amber-200">
                Watch list
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-950 dark:text-amber-100">
                {warnings.slice(0, 6).map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          )}
          {tips.length > 0 && (
            <div className="rounded-xl border border-emerald-300/80 bg-emerald-50/80 p-3 dark:border-emerald-700 dark:bg-emerald-950/45">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-900 dark:text-emerald-200">
                Signals
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-emerald-950 dark:text-emerald-100">
                {tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </motion.aside>
  )
}
