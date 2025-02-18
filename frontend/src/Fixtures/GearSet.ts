import { GearPiece, GearSet, GearSource, Jobs, Slot } from '../utils/types'

const piece: Omit<GearPiece, 'source'> =  { augmented: false, have: false, priority: 0 }

export const gearSet: GearSet = {
  id: '1',
  items: {
    [Slot.BODY]: { ...piece, source: GearSource.RAID },
    [Slot.BRACELET]: { ...piece, source: GearSource.RAID },
    [Slot.EARRINGS]: { ...piece, source: GearSource.TOME },
    [Slot.FEET]: { ...piece, source: GearSource.RAID },
    [Slot.HANDS]: { ...piece, source: GearSource.TOME },
    [Slot.HEAD]: { ...piece, source: GearSource.TOME },
    [Slot.LEGS]: { ...piece, source: GearSource.TOME },
    [Slot.NECKLACE]: { ...piece, source: GearSource.RAID },
    [Slot.RING1]: { ...piece, source: GearSource.TOME },
    [Slot.RING2]: { ...piece, source: GearSource.TOME },
    [Slot.WEAPON]: { ...piece, source: GearSource.RAID },
  },
  job: Jobs.RPR,
  name: 'New Gear Set',
  modified: true,
  archived: false,
}
