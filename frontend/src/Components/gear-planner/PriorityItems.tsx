import { useEffect, useState } from 'react'
import { DragAndDropCard } from '../common/Card'
import { Type } from '../common/Type'
import { SLOT_INFO } from '../../utils/constants'
import { GearSet, Slot } from '../../utils/types'
import { useSiteContext } from '../context/useSiteContext'

type TPItem = (typeof SLOT_INFO)[Slot.BODY] & { id: string; slot: Slot }

export function PriorityItems({
  onClose,
  gearSet,
}: {
  onClose: VoidFunction
  gearSet: GearSet | null
}) {
  const { updateGearSet } = useSiteContext()
  const [priorityItems, setPriorityItems] = useState<TPItem[]>([])
  useEffect(() => {
    const newSI = { ...SLOT_INFO, [Slot.RING2]: undefined }
    setPriorityItems(
      Object.entries(newSI)
        .filter(([_, si]) => si && si?.bookCost !== 0 && si.tomeCost !== 0)
        .map(([key, p]) => ({
          ...p,
          id: p?.name,
          slot: key as unknown as Slot,
        }))
        .sort((a, b) => {
          if (!gearSet) return 0
          return gearSet.items[a.slot].priority - gearSet.items[b.slot].priority
        }) as TPItem[],
    )
  }, [gearSet])

  const onSave = () => {
    if (!gearSet) return

    const newGearSet = { ...gearSet }

    priorityItems.forEach((pi, index) => {
      newGearSet.items[pi.slot] = { ...gearSet.items[pi.slot], priority: index }
      if (pi.slot === Slot.RING1) {
        newGearSet.items[Slot.RING2] = {
          ...gearSet.items[Slot.RING2],
          priority: index,
        }
      }
    })
    updateGearSet(newGearSet)
  }
  console.log(gearSet)

  return (
    <DragAndDropCard<TPItem>
      items={priorityItems}
      setItems={(i) => setPriorityItems(i)}
      title="Gear Priority"
      Component={({ item }) => <Type size="S">{item?.name}</Type>}
      id="gPrio"
      actions={[
        {
          label: 'Save',
          onClick: onSave,
        },
        {
          label: 'X',
          onClick: onClose,
        },
      ]}
    />
  )
}
