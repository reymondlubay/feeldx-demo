import { motion } from 'framer-motion'
import { ROOM_ORDER, ROOMS } from '../data/catalog'
import type { RoomType } from '../types'

interface RoomSelectorProps {
  active: RoomType
  onSelect: (room: RoomType) => void
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

export function RoomSelector({ active, onSelect }: RoomSelectorProps) {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Room type
          </h2>
          <p className="text-base font-medium text-slate-900 dark:text-slate-100">
            Choose a space to configure
          </p>
        </div>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5"
      >
        {ROOM_ORDER.map((key) => {
          const r = ROOMS[key]
          const isActive = active === key
          return (
            <motion.button
              key={key}
              type="button"
              variants={item}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(key)}
              aria-pressed={isActive}
              className={`rounded-2xl border px-3 py-3 text-left shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:focus-visible:outline-indigo-400 ${
                isActive
                  ? 'border-indigo-400 bg-linear-to-br from-indigo-50 to-white ring-2 ring-indigo-200 dark:border-indigo-500 dark:from-indigo-950 dark:to-slate-900 dark:ring-indigo-700'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{r.title}</span>
                {isActive && (
                  <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white dark:bg-indigo-500">
                    Active
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-400">{r.description}</p>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}
