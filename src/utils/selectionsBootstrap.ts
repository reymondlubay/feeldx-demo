import { ROOM_ORDER } from '../data/catalog'
import type { RoomType, SelectionsByRoom, SelectionState } from '../types'

const EMPTY: SelectionState = {}

export function createEmptySelectionsByRoom(): SelectionsByRoom {
  return {
    kitchen: { ...EMPTY },
    bathroom: { ...EMPTY },
    living_room: { ...EMPTY },
    bedroom: { ...EMPTY },
    laundry: { ...EMPTY },
  }
}

/** Merge persisted partial map with full room keys so new rooms never undefined. */
export function normalizeSelectionsByRoom(
  incoming: Partial<Record<RoomType, SelectionState>> | undefined | null,
): SelectionsByRoom {
  const base = createEmptySelectionsByRoom()
  if (!incoming || typeof incoming !== 'object') return base
  for (const rt of ROOM_ORDER) {
    const slice = incoming[rt]
    if (slice && typeof slice === 'object') base[rt] = { ...slice }
  }
  return base
}
