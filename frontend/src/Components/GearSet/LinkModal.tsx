import { useMemo, useState } from 'react'
import { GearSet, Slot } from '../../utils/types'
import { Modal } from '../common/Modal'
import { useSiteContext } from '../context/useSiteContext'
import { Type } from '../common/Type'
import { GearSetHeader } from './GearSetHeader'
import { FlexColumn, FlexRow } from '../common/Layout'
import { Checkbox } from '../common/Checkbox'
import { JobInfo, Role, SLOT_INFO } from '../../utils/constants'
import { isLeftSide } from '../../utils/utils'

function PieceSelector({
  slot,
  gearSet,
  compareGs,
  onChange,
}: {
  slot: Slot
  gearSet: GearSet
  compareGs: GearSet
  onChange: VoidFunction
}) {
  const [isChecked, setIsChecked] = useState(
    gearSet.items[slot].id === compareGs.items[slot].id,
  )
  if (slot === Slot.WEAPON && gearSet.job !== compareGs.job) {
    return null
  }

  if (
    JobInfo[gearSet.job].role !== JobInfo[compareGs.job].role &&
    isLeftSide(slot)
  ) {
    return null
  }

  const imgSrc =
    slot === Slot.WEAPON ? JobInfo[gearSet.job].icon : SLOT_INFO[slot].icon

  return (
    <FlexColumn style={{ marginBottom: '8px' }}>
      <img src={imgSrc} height="32px" width="32px" />
      <Checkbox
        value={isChecked}
        onChange={(value) => {
          setIsChecked(value)
          onChange()
        }}
      />
    </FlexColumn>
  )
}

export function LinkModal({
  isOpen,
  onClose,
  gearSet,
}: {
  isOpen: boolean
  onClose: VoidFunction
  gearSet: GearSet
}) {
  const { characters, selectedCharacter, updateGearPiece } = useSiteContext()
  const [selected, setSelected] = useState<GearSet | null>(null)

  const otherGearSets = useMemo(() => {
    if (!selectedCharacter || !isOpen) return []
    if (selected) return [selected]
    const sets = characters[selectedCharacter].gearSets
      .filter((gs) => gs.id !== gearSet.id)
      .filter((gs) => {
        const nRole = JobInfo[gs.job].role
        const oRole = JobInfo[gearSet.job].role
        if (nRole === oRole) {
          return true
        }
        const roleMap = [nRole, oRole]
        if (roleMap.includes(Role.MAIMING) && roleMap.includes(Role.STRIKING)) {
          return true
        }
        if (roleMap.includes(Role.SCOUTING) && roleMap.includes(Role.RANGED)) {
          return true
        }
        return false
      })
    return sets
  }, [gearSet, characters, selectedCharacter, isOpen, selected])

  return (
    <Modal
      title={`Link ${gearSet.name} to Set`}
      onClose={onClose}
      open={isOpen}
    >
      {otherGearSets.length > 0 ? (
        otherGearSets.map((gs) => (
          <FlexColumn>
            <FlexRow>
              <div style={{ flexGrow: 2 }}>
                <GearSetHeader gearSet={gs} compact editable={false} />
              </div>
              <Checkbox
                value={selected?.id === gs.id}
                onChange={(isChecked) => {
                  if (!isChecked) {
                    setSelected(null)
                  } else {
                    setSelected(gs)
                  }
                }}
              />
            </FlexRow>
            {selected?.id === gs.id && (
              <FlexRow>
                {Object.entries(gs.items).map(([slot, piece]) => (
                  <PieceSelector
                    slot={Number(slot) as Slot}
                    gearSet={gs}
                    compareGs={gearSet}
                    onChange={() => {
                      updateGearPiece({
                        id: gearSet.id,
                        slot: Number(slot),
                        value: {
                          ...gearSet.items[Number(slot) as Slot],
                          id: piece.id,
                        },
                      })
                    }}
                  />
                ))}
              </FlexRow>
            )}
          </FlexColumn>
        ))
      ) : (
        <Type size="M">No available Gearsets to Link</Type>
      )}
    </Modal>
  )
}
