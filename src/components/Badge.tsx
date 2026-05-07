import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'neutral'
  className?: string
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default:
    'bg-indigo-100 text-indigo-800 ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-200 dark:ring-indigo-700',
  success:
    'bg-emerald-100 text-emerald-900 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-800',
  warning:
    'bg-amber-100 text-amber-950 ring-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:ring-amber-700',
  neutral:
    'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-600',
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const v = variants[variant]
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${v} ${className}`}
    >
      {children}
    </span>
  )
}
