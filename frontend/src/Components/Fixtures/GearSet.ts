import { GearSet, GearSource, Jobs } from "../../utils/types";


export const gearSet: GearSet = {
  id: '1',
  items: {
    Body: { augmented: false, have: false, source: GearSource.RAID },
    Bracelet: { augmented: false, have: false, source: GearSource.RAID },
    Earrings: { augmented: false, have: false, source: GearSource.TOME },
    Feet: { augmented: false, have: false, source: GearSource.RAID },
    Hands: { augmented: false, have: false, source: GearSource.TOME },
    Head: { augmented: false, have: false, source: GearSource.TOME },
    Legs: { augmented: false, have: false, source: GearSource.TOME },
    Necklace: { augmented: false, have: false, source: GearSource.RAID },
    Ring1: { augmented: false, have: false, source: GearSource.TOME },
    Ring2: { augmented: false, have: false, source: GearSource.TOME },
    Weapon: { augmented: false, have: false, source: GearSource.RAID },
  },
  job: Jobs.RPR,
  name: 'Anabasios',
}
