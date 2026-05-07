import { motion } from 'framer-motion'
import { AISummaryPanel } from '../components/AISummaryPanel'
import { Header } from '../components/Header'
import { RoomSelector } from '../components/RoomSelector'
import { SelectionFieldCard } from '../components/SelectionFieldCard'
import { SummaryPanel } from '../components/SummaryPanel'
import { useRoomCatalog } from '../hooks/useRoomCatalog'
import { useSelectionsStore } from '../store/useSelectionsStore'

export function HomePage() {
  const room = useSelectionsStore((s) => s.room)
  const selections = useSelectionsStore((s) => s.selectionsByRoom[s.room])
  const aiResult = useSelectionsStore((s) => s.aiResult)
  const setRoom = useSelectionsStore((s) => s.setRoom)
  const setSelection = useSelectionsStore((s) => s.setSelection)
  const generateAi = useSelectionsStore((s) => s.generateAi)

  const catalog = useRoomCatalog(room)

  return (
    <div className="flex min-h-screen flex-col pb-14">
      <Header />
      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:items-start lg:gap-10 lg:px-8">
        <SummaryPanel room={room} selections={selections ?? {}} />

        <div className="order-2 flex flex-col space-y-8 lg:order-1">
          <RoomSelector active={room} onSelect={setRoom} />

          <motion.section layout className="space-y-3">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Materials &amp; furniture
              </h2>
              <p className="text-base font-medium text-slate-900 dark:text-slate-100">
                Configure items available for this room
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {catalog.fields.map((field) => (
                <SelectionFieldCard
                  key={`${room}-${field.id}`}
                  field={field}
                  value={selections?.[field.id]}
                  onChange={setSelection}
                />
              ))}
            </div>
          </motion.section>

          <AISummaryPanel result={aiResult} onGenerate={generateAi} />
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white/70 py-4 text-center text-[11px] text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
        FeelDX Materials &amp; Furniture Selection Assistant · Internal prototype · Not for construction documentation
      </footer>
    </div>
  )
}
