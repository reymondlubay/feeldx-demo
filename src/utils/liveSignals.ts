import type { RoomType, SelectionFieldId, SelectionState } from '../types'
import { getRoomDefinition, getOptionByFieldAndId } from '../data/catalog'

function tagsFor(selections: SelectionState, fieldId: SelectionFieldId): string[] {
  const id = selections[fieldId]
  if (!id) return []
  return getOptionByFieldAndId(fieldId, id)?.tags ?? []
}

function hasAnyTag(selections: SelectionState, fieldId: SelectionFieldId, prefix: string) {
  return tagsFor(selections, fieldId).some((t) => t.startsWith(prefix))
}

/** Short bullets for the live summary sidebar (subset of AI rules). */
export function getLiveWarningsAndTips(
  room: RoomType,
  selections: SelectionState,
): { warnings: string[]; tips: string[] } {
  const warnings: string[] = []
  const tips: string[] = []
  const def = getRoomDefinition(room)
  const fieldIds = def.fields.map((f) => f.id)

  for (const fid of fieldIds) {
    if (!selections[fid]) {
      warnings.push(`${def.fields.find((f) => f.id === fid)?.label ?? fid} — not selected yet.`)
    }
  }

  if (room === 'bedroom' && !selections.bed) {
    warnings.push('Bedroom suite is missing a bed — add an essential sleeping piece.')
  }

  const darkFloor =
    hasAnyTag(selections, 'flooring', 'tone:dark') ||
    selections.flooring === 'concrete' // concrete mid but can feel heavy — optional; skip strict
  const darkWall = hasAnyTag(selections, 'wallFinish', 'tone:dark')
  if (darkFloor && darkWall) {
    tips.push('Dark flooring plus dark walls can recess light — consider brighter accents or layered lighting.')
  }

  const woodFloor = tagsFor(selections, 'flooring').some(
    (t) => t === 'material:wood' || t.includes('wood'),
  )
  const warmLight = hasAnyTag(selections, 'lighting', 'warmth:warm')
  if (woodFloor && warmLight) {
    tips.push('Wood flooring with warm lighting reads cozy — accent with soft textiles if you want more hygge.')
  }

  const modernCab =
    selections.cabinetryFinish &&
    tagsFor(selections, 'cabinetryFinish').includes('style:modern')
  const vintageFurniture =
    ['sofa', 'chair', 'table'].some((k) => {
      const key = k as SelectionFieldId
      return tagsFor(selections, key).includes('style:vintage')
    })
  if (modernCab && vintageFurniture) {
    tips.push('Modern cabinetry with vintage-leaning furniture can feel mixed — bridge with a shared neutral or hardware line.')
  }

  return { warnings, tips }
}
