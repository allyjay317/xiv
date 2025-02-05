import { GearSet, GearSource, Jobs, Slot } from '../utils/types'

export const gearSet: GearSet = {
  id: '1',
  items: {
    [Slot.BODY]: { augmented: false, have: false, source: GearSource.RAID },
    [Slot.BRACELET]: { augmented: false, have: false, source: GearSource.RAID },
    [Slot.EARRINGS]: { augmented: false, have: false, source: GearSource.TOME },
    [Slot.FEET]: { augmented: false, have: false, source: GearSource.RAID },
    [Slot.HANDS]: { augmented: false, have: false, source: GearSource.TOME },
    [Slot.HEAD]: { augmented: false, have: false, source: GearSource.TOME },
    [Slot.LEGS]: { augmented: false, have: false, source: GearSource.TOME },
    [Slot.NECKLACE]: { augmented: false, have: false, source: GearSource.RAID },
    [Slot.RING1]: { augmented: false, have: false, source: GearSource.TOME },
    [Slot.RING2]: { augmented: false, have: false, source: GearSource.TOME },
    [Slot.WEAPON]: { augmented: false, have: false, source: GearSource.RAID },
  },
  job: Jobs.RPR,
  name: 'New Gear Set',
  modified: true,
}
