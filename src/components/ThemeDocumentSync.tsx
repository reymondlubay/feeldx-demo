import { useLayoutEffect } from 'react'
import { useSelectionsStore } from '../store/useSelectionsStore'

/** Keeps `.dark` and `color-scheme` aligned with persisted theme after JS loads. */
export function ThemeDocumentSync() {
  const theme = useSelectionsStore((s) => s.theme)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme === 'dark' ? 'dark' : 'light'
  }, [theme])

  return null
}
