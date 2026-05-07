export type RoomType =
  | 'kitchen'
  | 'bathroom'
  | 'living_room'
  | 'bedroom'
  | 'laundry'

export type SelectionFieldId =
  | 'flooring'
  | 'wallFinish'
  | 'benchtop'
  | 'cabinetryFinish'
  | 'sofa'
  | 'table'
  | 'chair'
  | 'bed'
  | 'lighting'

/** Relative spend tier attached to catalog options — drives mock estimates. */
export type CostTier = 'low' | 'medium' | 'high'

export interface SelectionOption {
  id: string
  label: string
  costTier: CostTier
  /** Rule-engine tags (tone, warmth, style, material, etc.) */
  tags: string[]
}

export interface FieldDefinition {
  id: SelectionFieldId
  label: string
  description?: string
  options: SelectionOption[]
}

export interface RoomDefinition {
  type: RoomType
  title: string
  description: string
  fields: FieldDefinition[]
}

export type SelectionState = Partial<Record<SelectionFieldId, string | null>>

/** Independent selections for each room; switching tabs restores prior picks. */
export type SelectionsByRoom = Record<RoomType, SelectionState>

export type AppTheme = 'light' | 'dark'

export interface MockAIResult {
  headline: string
  costNarrative: string
  compatibility: string[]
  missing: string[]
  recommendations: string[]
  generatedAt: string
}

export type AggregateCostBand = 'low' | 'medium' | 'high'
