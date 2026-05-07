import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { FEELDX_STORAGE_KEY } from '../constants/storage'
import { ROOM_ORDER } from '../data/catalog'
import type {
  AppTheme,
  MockAIResult,
  RoomType,
  SelectionFieldId,
  SelectionState,
  SelectionsByRoom,
} from '../types'
import { generateMockAISummary } from '../utils/mockAISummary'
import { normalizeSelectionsByRoom } from '../utils/selectionsBootstrap'

interface SelectionsStore {
  theme: AppTheme
  setTheme: (theme: AppTheme) => void
  toggleTheme: () => void
  room: RoomType
  selectionsByRoom: SelectionsByRoom
  aiResult: MockAIResult | null

  setRoom: (room: RoomType) => void
  setSelection: (field: SelectionFieldId, optionId: string | null) => void
  clearAi: () => void
  generateAi: () => void
}

function parseRoom(rt: unknown): RoomType | null {
  if (typeof rt === 'string' && (ROOM_ORDER as readonly string[]).includes(rt)) {
    return rt as RoomType
  }
  return null
}

function parseTheme(theme: unknown): AppTheme | null {
  if (theme === 'dark') return 'dark'
  if (theme === 'light') return 'light'
  return null
}

/** Legacy hydration shape — flat selections before `selectionsByRoom`. */
interface LegacyHydratedPartial {
  theme?: unknown
  room?: unknown
  selections?: unknown
  selectionsByRoom?: unknown
}

export const useSelectionsStore = create<SelectionsStore>()(
  persist(
    (set, get) => ({
      theme: 'light' as AppTheme,

      setTheme: (theme) => set({ theme }),

      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      room: 'kitchen',

      selectionsByRoom: normalizeSelectionsByRoom(undefined),

      aiResult: null,

      setRoom: (room) =>
        set({
          room,
          aiResult: null,
        }),

      setSelection: (field, optionId) =>
        set((s) => ({
          selectionsByRoom: {
            ...s.selectionsByRoom,
            [s.room]: {
              ...(s.selectionsByRoom[s.room] ?? {}),
              [field]: optionId,
            },
          },
          aiResult: null,
        })),

      clearAi: () => set({ aiResult: null }),

      generateAi: () => {
        const { room, selectionsByRoom } = get()
        set({ aiResult: generateMockAISummary(room, selectionsByRoom[room] ?? {}) })
      },
    }),
    {
      name: FEELDX_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        theme: s.theme,
        room: s.room,
        selectionsByRoom: s.selectionsByRoom,
      }),
      merge: (persistedState, currentState) => {
        const current = currentState as SelectionsStore
        if (persistedState == null || typeof persistedState !== 'object') {
          return current
        }
        const persistedUnknown = persistedState as LegacyHydratedPartial

        let byRoomCandidate: SelectionsByRoom | Partial<SelectionsByRoom> | undefined =
          persistedUnknown?.selectionsByRoom as SelectionsByRoom | undefined

        const legacySelections = persistedUnknown?.selections as SelectionState | undefined
        if (!byRoomCandidate && legacySelections && typeof legacySelections === 'object') {
          const roomGuess = parseRoom(persistedUnknown.room) ?? 'kitchen'
          byRoomCandidate = { ...normalizeSelectionsByRoom(undefined), [roomGuess]: legacySelections }
        }

        const theme = parseTheme(persistedUnknown?.theme) ?? current.theme
        const room = parseRoom(persistedUnknown?.room) ?? current.room

        return {
          ...current,
          theme,
          room,
          selectionsByRoom: normalizeSelectionsByRoom(byRoomCandidate),
          aiResult: null,
        }
      },
    },
  ),
)
