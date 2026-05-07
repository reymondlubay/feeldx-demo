import { motion } from 'framer-motion'
import { useLayoutEffect, useRef } from 'react'
import type { SVGProps } from 'react'
import { useSelectionsStore } from '../store/useSelectionsStore'

const STICKY_SUMMARY_GAP_PX = 10

export function Header() {
  const theme = useSelectionsStore((s) => s.theme)
  const toggleTheme = useSelectionsStore((s) => s.toggleTheme)
  const headerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return

    const sync = () => {
      const h = Math.ceil(el.getBoundingClientRect().height) + STICKY_SUMMARY_GAP_PX
      document.documentElement.style.setProperty('--feeldx-sticky-summary-top', `${h}px`)
    }

    sync()

    const ro = new ResizeObserver(sync)
    ro.observe(el)

    window.addEventListener('resize', sync)
    window.addEventListener('orientationchange', sync)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', sync)
      window.removeEventListener('orientationchange', sync)
    }
  }, [])

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            FeelDX prototype
          </p>
          <h1
            className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50"
            style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
          >
            Materials &amp; Furniture Selection Assistant
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Pick a room, layer finishes and furnishings, then generate a directional mock briefing — optimized for demos
            rather than fabrication-ready packages.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? (
              <>
                <SunIcon className="h-4 w-4 shrink-0 text-amber-400" aria-hidden />
                Light
              </>
            ) : (
              <>
                <MoonIcon className="h-4 w-4 shrink-0 text-indigo-400" aria-hidden />
                Dark
              </>
            )}
          </button>
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
            Vite · React · TS · Tailwind
          </span>
          <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200">
            Mock intelligence only — no external AI
          </span>
        </div>
      </div>
    </motion.header>
  )
}

function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.73-12.73-1.41 1.41M17.66 17.66l1.41 1.41M6.34 6.34 4.93 4.93"
      />
    </svg>
  )
}

function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 14.462A9 9 0 017.538 3 7 7 0 0012 21a9 9 0 009-6.538z"
      />
    </svg>
  )
}
