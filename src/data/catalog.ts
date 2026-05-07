import type {
  FieldDefinition,
  RoomDefinition,
  RoomType,
  SelectionFieldId,
  SelectionOption,
} from '../types'

const flooring: SelectionOption[] = [
  {
    id: 'vinyl_plank',
    label: 'Vinyl plank',
    costTier: 'low',
    tags: ['tone:mid', 'material:vinyl'],
  },
  {
    id: 'white_oak',
    label: 'White oak',
    costTier: 'medium',
    tags: ['tone:light', 'material:wood', 'warmth:warm'],
  },
  {
    id: 'walnut',
    label: 'Walnut hardwood',
    costTier: 'high',
    tags: ['tone:dark', 'material:wood', 'warmth:warm'],
  },
  {
    id: 'concrete',
    label: 'Polished concrete',
    costTier: 'medium',
    tags: ['tone:mid', 'material:concrete', 'style:modern'],
  },
  {
    id: 'marble_tile',
    label: 'Marble tile',
    costTier: 'high',
    tags: ['tone:light', 'material:stone', 'warmth:cool'],
  },
]

const wallFinish: SelectionOption[] = [
  {
    id: 'matte_white',
    label: 'Matte white paint',
    costTier: 'low',
    tags: ['tone:light'],
  },
  {
    id: 'soft_gray',
    label: 'Soft gray',
    costTier: 'low',
    tags: ['tone:mid'],
  },
  {
    id: 'matte_black',
    label: 'Matte black',
    costTier: 'medium',
    tags: ['tone:dark', 'style:modern'],
  },
  {
    id: 'wood_panel',
    label: 'Wood paneling',
    costTier: 'high',
    tags: ['tone:mid', 'material:wood', 'warmth:warm'],
  },
]

const benchtop: SelectionOption[] = [
  {
    id: 'laminate_bt',
    label: 'Laminate',
    costTier: 'low',
    tags: ['style:modern'],
  },
  {
    id: 'quartz',
    label: 'Quartz',
    costTier: 'medium',
    tags: ['style:modern', 'warmth:neutral'],
  },
  {
    id: 'marble_bt',
    label: 'Marble',
    costTier: 'high',
    tags: ['warmth:cool', 'style:modern'],
  },
  {
    id: 'concrete_bt',
    label: 'Concrete',
    costTier: 'medium',
    tags: ['style:modern', 'tone:mid'],
  },
]

const cabinetryFinish: SelectionOption[] = [
  {
    id: 'laminate_white_cab',
    label: 'Laminate — white',
    costTier: 'low',
    tags: ['tone:light', 'style:modern'],
  },
  {
    id: 'matte_black_cab',
    label: 'Matte black',
    costTier: 'medium',
    tags: ['tone:dark', 'style:modern'],
  },
  {
    id: 'white_oak_veneer',
    label: 'White oak veneer',
    costTier: 'medium',
    tags: ['tone:light', 'material:wood', 'warmth:warm', 'style:modern'],
  },
  {
    id: 'vintage_painted',
    label: 'Vintage painted',
    costTier: 'medium',
    tags: ['style:vintage', 'warmth:warm'],
  },
]

const sofa: SelectionOption[] = [
  {
    id: 'modular_gray',
    label: 'Modular — performance gray',
    costTier: 'medium',
    tags: ['style:modern', 'warmth:neutral'],
  },
  {
    id: 'velvet_lounge',
    label: 'Velvet lounge',
    costTier: 'high',
    tags: ['warmth:warm', 'style:modern'],
  },
  {
    id: 'chesterfield',
    label: 'Chesterfield (vintage-inspired)',
    costTier: 'high',
    tags: ['style:vintage', 'warmth:warm'],
  },
]

const table: SelectionOption[] = [
  {
    id: 'glass_metal',
    label: 'Glass & metal dining',
    costTier: 'medium',
    tags: ['style:modern', 'warmth:cool'],
  },
  {
    id: 'solid_oak',
    label: 'Solid oak dining',
    costTier: 'high',
    tags: ['material:wood', 'warmth:warm', 'style:traditional'],
  },
  {
    id: 'farmhouse_pine',
    label: 'Farmhouse pine',
    costTier: 'medium',
    tags: ['style:traditional', 'material:wood', 'warmth:warm'],
  },
]

const chair: SelectionOption[] = [
  {
    id: 'molded_plastic',
    label: 'Molded plastic shell',
    costTier: 'low',
    tags: ['style:modern', 'warmth:cool'],
  },
  {
    id: 'upholstered_accent',
    label: 'Upholstered accent',
    costTier: 'medium',
    tags: ['warmth:warm', 'style:modern'],
  },
  {
    id: 'antique_windsor',
    label: 'Antique Windsor',
    costTier: 'medium',
    tags: ['style:vintage', 'material:wood'],
  },
]

const bed: SelectionOption[] = [
  {
    id: 'platform_upholstered',
    label: 'Platform — upholstered',
    costTier: 'medium',
    tags: ['style:modern', 'warmth:neutral'],
  },
  {
    id: 'timber_frame',
    label: 'Timber frame',
    costTier: 'high',
    tags: ['material:wood', 'warmth:warm', 'style:traditional'],
  },
  {
    id: 'metal_minimal',
    label: 'Metal minimal',
    costTier: 'low',
    tags: ['style:modern', 'warmth:cool'],
  },
]

const lighting: SelectionOption[] = [
  {
    id: 'recessed_cool',
    label: 'Recessed LED (cool)',
    costTier: 'low',
    tags: ['warmth:cool', 'style:modern'],
  },
  {
    id: 'warm_pendant',
    label: 'Warm pendant',
    costTier: 'medium',
    tags: ['warmth:warm', 'style:modern'],
  },
  {
    id: 'warm_kit',
    label: 'Warm lighting kit',
    costTier: 'medium',
    tags: ['warmth:warm'],
  },
  {
    id: 'statement_pendant',
    label: 'Statement pendant light',
    costTier: 'high',
    tags: ['style:modern', 'warmth:warm'],
  },
]

function field(
  id: SelectionFieldId,
  label: string,
  description: string | undefined,
  options: SelectionOption[],
): FieldDefinition {
  return { id, label, description, options }
}

export const ROOM_ORDER: RoomType[] = [
  'kitchen',
  'bathroom',
  'living_room',
  'bedroom',
  'laundry',
]

export const ROOMS: Record<RoomType, RoomDefinition> = {
  kitchen: {
    type: 'kitchen',
    title: 'Kitchen',
    description: 'Surfaces, storage, and task lighting.',
    fields: [
      field(
        'flooring',
        'Flooring',
        'Durable, water-aware finish for high traffic.',
        flooring,
      ),
      field(
        'wallFinish',
        'Wall finish',
        'Paint or feature wall treatment.',
        wallFinish,
      ),
      field(
        'benchtop',
        'Benchtop',
        'Primary work surface material.',
        benchtop,
      ),
      field(
        'cabinetryFinish',
        'Cabinetry finish',
        'Fronts and panels — sets the kitchen tone.',
        cabinetryFinish,
      ),
      field(
        'lighting',
        'Lighting',
        'Ambient + task — critical in prep zones.',
        lighting,
      ),
    ],
  },
  bathroom: {
    type: 'bathroom',
    title: 'Bathroom',
    description: 'Moisture-smart finishes and vanity zone.',
    fields: [
      field('flooring', 'Flooring', 'Grip, warmth underfoot, and water risk.', flooring),
      field('wallFinish', 'Wall finish', 'Humidity tolerance and brightness.', wallFinish),
      field('benchtop', 'Vanity benchtop', 'Sealed surface for daily use.', benchtop),
      field(
        'cabinetryFinish',
        'Vanity cabinetry',
        'Storage fronts and moisture edges.',
        cabinetryFinish,
      ),
      field('lighting', 'Lighting', 'Vanity clarity and ambiance.', lighting),
    ],
  },
  living_room: {
    type: 'living_room',
    title: 'Living room',
    description: 'Seating layer, tables, and mood lighting.',
    fields: [
      field('flooring', 'Flooring', 'Comfort and acoustic feel.', flooring),
      field('wallFinish', 'Wall finish', 'Backdrop for furniture silhouettes.', wallFinish),
      field('sofa', 'Sofa', 'Primary seating — scale and texture.', sofa),
      field('table', 'Table', 'Coffee or occasional surface.', table),
      field('chair', 'Chair', 'Secondary seating / accent.', chair),
      field('lighting', 'Lighting', 'Layered light for evenings.', lighting),
    ],
  },
  bedroom: {
    type: 'bedroom',
    title: 'Bedroom',
    description: 'Rest-focused layout with storage adjacencies.',
    fields: [
      field('flooring', 'Flooring', 'Warmth and sound underfoot.', flooring),
      field('wallFinish', 'Wall finish', 'Calm palette anchor.', wallFinish),
      field('bed', 'Bed', 'Sleep surface and proportion.', bed),
      field('table', 'Bedside / desk table', 'Nightstand or compact work.', table),
      field('chair', 'Chair', 'Reading or dressing chair.', chair),
      field('lighting', 'Lighting', 'Dimming-friendly layers.', lighting),
    ],
  },
  laundry: {
    type: 'laundry',
    title: 'Laundry',
    description: 'Utility-first layout with easy-clean surfaces.',
    fields: [
      field('flooring', 'Flooring', 'Spills, machines, and traffic.', flooring),
      field('wallFinish', 'Wall finish', 'Bright, cleanable surfaces.', wallFinish),
      field(
        'cabinetryFinish',
        'Cabinetry finish',
        'Detergent and bulk storage.',
        cabinetryFinish,
      ),
      field('lighting', 'Lighting', 'Task visibility for sorting and folding.', lighting),
    ],
  },
}

export function getRoomDefinition(room: RoomType): RoomDefinition {
  return ROOMS[room]
}

export function getOptionByFieldAndId(
  fieldId: SelectionFieldId,
  optionId: string,
): SelectionOption | undefined {
  const pools: Record<SelectionFieldId, SelectionOption[]> = {
    flooring,
    wallFinish,
    benchtop,
    cabinetryFinish,
    sofa,
    table,
    chair,
    bed,
    lighting,
  }
  return pools[fieldId]?.find((o) => o.id === optionId)
}
