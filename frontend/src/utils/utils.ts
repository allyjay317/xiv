import { baseStats, SLOT_INFO } from "./constants"
import { GearSet, GearSource, Slot, UpgradeItem } from "./types"


type StringMap<IDS extends string> = {
  [ID in IDS]: string
}

export function createTypeMap<T extends string>(map: StringMap<T>) {
  return map
}

export function getStats(gearSets: GearSet[]) {
  const data = structuredClone(baseStats)
  gearSets.forEach(gs => {
    Object.entries(gs.items).forEach(([slot, item]) => {
      const name: keyof typeof data = (
        parseInt(slot) === Slot.RING2 ? Slot.RING1 : slot as unknown as Slot
      ) as keyof typeof data
      if (item.source === GearSource.RAID) {
        data[name].raid += item.have ? 0 : 1
      } else if (item.source === GearSource.TOME) {
        data[name].tomestone += item.have ? 0 : 1
        if (!item.augmented) {
          const floor = SLOT_INFO[name].floor
          if (floor === 1) {
            data[UpgradeItem.SHINE].raid += 1
          } else if (floor === 2 || floor === 3) {
            data[UpgradeItem.TWINE].raid += 1
          } else {
            data[UpgradeItem.BRINE].raid += 1
          }
        }
      }
    })
  })
  return {
    floor1: [
      {
        slot: Slot.EARRINGS,
        ...data[Slot.EARRINGS],
      },
      { slot: Slot.NECKLACE, ...data[Slot.NECKLACE] },
      { slot: Slot.BRACELET, ...data[Slot.BRACELET] },
      { slot: Slot.RING1, ...data[Slot.RING1] },
    ],
    floor2: [
      { slot: Slot.HEAD, ...data[Slot.HEAD] },
      { slot: Slot.HANDS, ...data[Slot.HANDS] },
      { slot: Slot.FEET, ...data[Slot.FEET] },
      { slot: UpgradeItem.SHINE, ...data[UpgradeItem.SHINE] },
    ],
    floor3: [
      { slot: Slot.BODY, ...data[Slot.BODY] },
      { slot: Slot.LEGS, ...data[Slot.LEGS] },
      { slot: UpgradeItem.BRINE, ...data[UpgradeItem.BRINE] },
      { slot: UpgradeItem.TWINE, ...data[UpgradeItem.TWINE] },
    ],
    floor4: [{ slot: Slot.WEAPON, ...data[Slot.WEAPON] }],
  }
}