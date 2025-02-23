import { useMemo, useState } from 'react'
import { GearSet } from '../../utils/types'
import { Modal } from '../common/Modal'
import { GearSetPriority } from './GearSetPriority'
import { PriorityItems } from './PriorityItems'
import { useSiteContext } from '../context/useSiteContext'
import { FlexRow } from '../common/Layout'
import { Card } from '../common/Card'

export function PriorityModal({
  onClose,
  ...props
}: {
  open: boolean
  onClose: VoidFunction
}) {
  const { characters, selectedCharacter } = useSiteContext()
  const [priorityOpen, setPriorityOpen] = useState<null | GearSet>(null)
  const displayedCharacter = useMemo(
    () => (selectedCharacter ? characters[selectedCharacter] : undefined),
    [selectedCharacter, characters],
  )

  if (!displayedCharacter) return null

  const onModalClose = () => {
    setPriorityOpen(null)
    onClose()
  }

  return (
    <Modal onClose={onModalClose} {...props} title="Priority">
      <FlexRow justify="center">
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
        {priorityOpen && (
          <Card style={{ height: '65vh' }} title={priorityOpen.name}>
            <FlexRow style={{ minWidth: '256px' }}>
              <PriorityItems
                onClose={() => setPriorityOpen(null)}
                gearSet={priorityOpen}
              />
            </FlexRow>
          </Card>
        )}
      </FlexRow>
    </Modal>
  )
}
