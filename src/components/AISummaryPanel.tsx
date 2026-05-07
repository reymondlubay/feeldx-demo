import { motion, AnimatePresence } from 'framer-motion'
import type { MockAIResult } from '../types'

interface AISummaryPanelProps {
  result: MockAIResult | null
  onGenerate: () => void
}

export function AISummaryPanel({ result, onGenerate }: AISummaryPanelProps) {
  const formatted =
    result &&
    new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(result.generatedAt))

  return (
    <section className="rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-4 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:to-slate-950">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Mock AI briefing
          </h2>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Rule-engine narrative (offline)</p>
        </div>
        <motion.button
          type="button"
          onClick={onGenerate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-indigo-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:shadow-indigo-900/40"
        >
          Generate AI summary
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-dashed border-slate-200 bg-white/70 px-3 py-4 text-xs leading-relaxed text-slate-600 dark:border-slate-600 dark:bg-slate-950/60 dark:text-slate-300"
          >
            Click generate to synthesize compatibility, omissions, budget posture, and next actions from your current picks.
            This prototype never calls remote models — everything is deterministic from tags and tiers.
          </motion.p>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 space-y-4 text-sm leading-relaxed text-slate-800 dark:text-slate-200"
          >
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">{result.headline}</h3>
              {formatted && (
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{formatted}</span>
              )}
            </header>
            <p className="text-sm text-slate-700 dark:text-slate-300">{result.costNarrative}</p>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-inner shadow-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950">
                <h4 className="text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                  Compatibility observations
                </h4>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-700 dark:text-slate-300">
                  {(result.compatibility.length
                    ? result.compatibility
                    : ['No conflicting signals surfaced with current picks — consider adding bolder contrast if the space reads flat.']
                  ).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-inner shadow-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:shadow-slate-950">
                <h4 className="text-xs font-bold uppercase tracking-wide text-rose-700 dark:text-rose-300">
                  Gaps / missing inputs
                </h4>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-700 dark:text-slate-300">
                  {(result.missing.length
                    ? result.missing
                    : [
                        'Selections look complete across required categories — refine lighting layers if cabinetry is matte black or heavily saturated walls are used.',
                      ]
                  ).map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-300/80 bg-emerald-50/70 p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
              <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-900 dark:text-emerald-200">
                Recommended next moves
              </h4>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-emerald-950 dark:text-emerald-50">
                {result.recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
