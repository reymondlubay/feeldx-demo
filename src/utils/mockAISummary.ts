import type { MockAIResult, RoomType, SelectionFieldId, SelectionState } from '../types'
import { getRoomDefinition, getOptionByFieldAndId } from '../data/catalog'
import { bandLabel, computeAggregateCost } from './cost'

function tags(selections: SelectionState, field: SelectionFieldId): string[] {
  const id = selections[field]
  if (!id) return []
  return getOptionByFieldAndId(field, id)?.tags ?? []
}

function hasTag(selections: SelectionState, field: SelectionFieldId, tag: string) {
  return tags(selections, field).includes(tag)
}

/** Rule-based mock “AI” narrative for the prototype. */
export function generateMockAISummary(
  room: RoomType,
  selections: SelectionState,
): MockAIResult {
  const roomDef = getRoomDefinition(room)
  const fieldIds = roomDef.fields.map((f) => f.id)
  const { band, coverage } = computeAggregateCost(selections, fieldIds)

  const headline = `${roomDef.title} concept — directional design read`

  const costTierWord = bandLabel(band)
  let costNarrative: string
  switch (band) {
    case 'low':
      costNarrative = `Material mix skews toward value-led finishes (${costTierWord} relative cost profile). Marble, walnut, or premium lighting would push this into a higher bracket. `
      costNarrative += coverage < 1
        ? 'Several categories are incomplete — finalized selections may shift spend once essentials are locked.'
        : 'Coverage looks complete enough to treat this estimate as directional.'
      break
    case 'medium':
      costNarrative = `Balanced palette: quartz-style surfaces, mid hardwoods, and mixed lighting typically land in a ${costTierWord} band. `
      costNarrative +=
        coverage < 1 ? 'Finalize missing pieces before locking a budget contingency.' : 'Good baseline for phased upgrades.'
      break
    case 'high':
      costNarrative = `Selections include premium signals (natural stone tiers, walnut, statement lighting) consistent with a ${costTierWord} profile. `
      costNarrative += 'Expect trade-offs around maintenance and fabrication lead times.'
      break
  }

  const compatibility: string[] = []

  const darkFloor = hasTag(selections, 'flooring', 'tone:dark')
  const darkWall = hasTag(selections, 'wallFinish', 'tone:dark')
  if (darkFloor && darkWall) {
    compatibility.push(
      'Dark flooring layered with dark wall treatments can perceptually reduce brightness — widen contrast via rugs, trims, or secondary reflectors.',
    )
  }

  const woodFlooring = hasTag(selections, 'flooring', 'material:wood')
  const warmLight = hasTag(selections, 'lighting', 'warmth:warm')
  const coolLight = hasTag(selections, 'lighting', 'warmth:cool')

  if (woodFlooring && warmLight) {
    compatibility.push(
      'Wood flooring with warm lighting reinforces a tactile, grounded atmosphere suitable for lounges and quieter zones.',
    )
  }

  if (coolLight && woodFlooring && !warmLight) {
    compatibility.push(
      'Cool recessed lighting atop warm timber can clash — soften with warm-dim circuits or supplemental pendants.',
    )
  }

  const modernCab = hasTag(selections, 'cabinetryFinish', 'style:modern')
  const vintageMood =
    hasTag(selections, 'sofa', 'style:vintage') ||
    hasTag(selections, 'chair', 'style:vintage') ||
    hasTag(selections, 'table', 'style:vintage')

  if (modernCab && vintageMood) {
    compatibility.push(
      'Modern cabinetry next to overtly vintage furniture can read eclectic — unify with matte metal hardware, tonal neutrals, or repeated wood species.',
    )
  }

  const missing: string[] = []

  for (const f of roomDef.fields) {
    if (!selections[f.id]) {
      missing.push(`Select ${f.label.toLowerCase()} to complete the ${roomDef.title.toLowerCase()} brief.`)
    }
  }

  if (fieldIds.includes('lighting') && !selections.lighting) {
    missing.push('Add lighting — ergonomic comfort and perceived finish quality hinge on layering ambient, task, and accent sources.')
  }

  if (!selections.flooring && fieldIds.includes('flooring')) {
    missing.push('Flooring is foundational for tone and maintenance — leaving it unspecified limits scheduling and edge trims.')
  }

  if (room === 'bedroom' && fieldIds.includes('bed') && !selections.bed) {
    missing.push('Essential gap: bedrooms need a designated bed — prioritize scale and walkway clearance.')
  }

  const recommendations = new Set<string>()

  if (darkFloor && darkWall) {
    recommendations.add('Introduce lighter wall finishes or brighter ceiling paint to regain visual lift.')
    recommendations.add('Add complementary lighting zones (wash + accent) rather than relying on a single fitting.')
  }

  if (
    !warmLight &&
    (woodFlooring || hasTag(selections, 'flooring', 'material:vinyl'))
  ) {
    recommendations.add('Consider warm-toned layered lighting for evening comfort.')
  }

  if (!selections.table && (room === 'living_room' || room === 'bedroom')) {
    recommendations.add('Add storage or surface furniture suited to rhythm of use — side consoles help balance seating.')
  }

  if (darkWall || darkFloor) {
    recommendations.add('Where dark materials stack, reinforce contrast via textiles or metal accents.')
  }

  if (modernCab && vintageMood) {
    recommendations.add('Reduce style tension by repeating one finish (metal tone or wood stain) across both eras.')
  }

  recommendations.add('Document benchtop sealing + cleaning expectations if stone or porous concrete is shortlisted.')

  const generatedAt = new Date().toISOString()

  return {
    headline,
    costNarrative,
    compatibility,
    missing,
    recommendations: [...recommendations],
    generatedAt,
  }
}
