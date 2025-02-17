import { useMemo } from 'react'
import { Card } from '../common/Card'
import { Type } from '../common/Type'
import { SLOT_INFO } from '../../utils/constants'
import { Slot } from '../../utils/types'

export function PriorityItems() {
  const priorityItems = useMemo(() => {
    const newSI = { ...SLOT_INFO, [Slot.RING2]: undefined }
    return Object.values(newSI).filter(
      (si) => si && si?.bookCost !== 0 && si.tomeCost !== 0,
    )
  }, [])
  return (
    <Card title="Gear Priority">
      {priorityItems.map((s) => {
        return (
          <Card>
            <Type size="S">{s?.name}</Type>
          </Card>
        )
      })}
    </Card>
  )
}
