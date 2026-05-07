import { useMemo } from 'react'
import { getRoomDefinition } from '../data/catalog'
import type { RoomType } from '../types'

export function useRoomCatalog(room: RoomType) {
  return useMemo(() => getRoomDefinition(room), [room])
}
