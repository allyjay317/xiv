import { useMemo, useState } from 'react'
import { GearSet } from '../../utils/types'
import { Modal } from '../common/Modal'
import { GearSetPriority } from './GearSetPriority'
import { PriorityItems } from './PriorityItems'
import { useSiteContext } from '../context/useSiteContext'

export function PriorityModal(props: { open: boolean; onClose: VoidFunction }) {
  const { characters, selectedCharacter } = useSiteContext()
  const [priorityOpen, setPriorityOpen] = useState<null | GearSet>(null)
  const displayedCharacter = useMemo(
    () => (selectedCharacter ? characters[selectedCharacter] : undefined),
    [selectedCharacter],
  )

  const piTop = useMemo(() => {
    const sets = displayedCharacter?.gearSets
    if (!sets) return { top: 0 }
    const index = sets.findIndex((gs) => gs.id === priorityOpen?.id)
    if (index && index >= sets.length / 2) {
      return { bottom: 0 }
    }
    return { top: 0 }
  }, [priorityOpen, displayedCharacter])

  if (!displayedCharacter) return null

  return (
    <Modal {...props} title="Priority">
      <div style={{ position: 'relative' }}>
        <GearSetPriority
          gearSets={displayedCharacter.gearSets}
          onOpenPriority={(gs: GearSet) => {
            if (priorityOpen?.id === gs.id) {
              setPriorityOpen(null)
            } else {
              setPriorityOpen(gs)
            }
          }}
          isSelected={priorityOpen?.id}
        />
        <div
          style={{
            visibility: priorityOpen !== null ? 'visible' : 'hidden',
            position: 'absolute',
            left: 350,
            ...piTop,
          }}
        >
          <PriorityItems
            onClose={() => setPriorityOpen(null)}
            gearSet={priorityOpen}
          />
        </div>
      </div>
    </Modal>
  )
}
