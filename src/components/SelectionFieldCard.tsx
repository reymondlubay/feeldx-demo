import { motion } from 'framer-motion'
import type { FieldDefinition, SelectionFieldId } from '../types'
import { getOptionByFieldAndId } from '../data/catalog'

interface SelectionFieldCardProps {
  field: FieldDefinition
  value: string | null | undefined
  onChange: (fieldId: SelectionFieldId, optionId: string | null) => void
}

export function SelectionFieldCard({ field, value, onChange }: SelectionFieldCardProps) {
  return (
    <motion.article
      layout
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">{field.label}</h3>
          {field.description && (
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{field.description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onChange(field.id, null)}
          className="text-xs font-semibold text-slate-500 underline-offset-4 hover:text-indigo-700 hover:underline dark:text-slate-400 dark:hover:text-indigo-400"
        >
          Clear
        </button>
      </div>
      <div
        role="radiogroup"
        aria-label={field.label}
        className="mt-3 flex flex-wrap gap-2"
      >
        {field.options.map((opt) => {
          const selected = value === opt.id
          const tierColor =
            opt.costTier === 'high'
              ? 'ring-rose-300 bg-rose-50/90 dark:bg-rose-950/55 dark:ring-rose-600'
              : opt.costTier === 'medium'
                ? 'ring-amber-300 bg-amber-50/85 dark:bg-amber-950/45 dark:ring-amber-700'
                : 'ring-emerald-300 bg-emerald-50/85 dark:bg-emerald-950/45 dark:ring-emerald-700'
          const selectedCls = selected
            ? `${tierColor} ring-2 shadow-md`
            : 'border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-950 dark:hover:border-slate-500 dark:hover:bg-slate-800'
          return (
            <motion.button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(field.id, opt.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`rounded-xl px-3 py-2 text-left text-xs font-medium transition dark:text-slate-100 ${selectedCls}`}
            >
              <span className="block">{opt.label}</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {opt.costTier} tier
              </span>
            </motion.button>
          )
        })}
      </div>
      {value && (
        <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
          Tags: {(getOptionByFieldAndId(field.id, value)?.tags ?? []).join(', ') || '—'}
        </p>
      )}
    </motion.article>
  )
}
