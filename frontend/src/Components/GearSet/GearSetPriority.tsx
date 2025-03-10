import { GearSet } from '../../utils/types'
import { DragAndDropCard } from '../common/Card'
import { GearSetHeader } from './GearSetHeader'
import { Type } from '../common/Type'
import { useEffect, useMemo, useState } from 'react'
import { useSiteContext } from '../context/useSiteContext'
import { FlexColumn, FlexRow } from '../common/Layout'
import { Button } from '../common/Button'
import { Color } from '../../utils/colorSchemes'

function GearSetDisplay({
  gs,
  isSelected,
  onOpenPriority,
}: {
  gs?: GearSet
  isSelected?: string
  onOpenPriority: (gs: GearSet) => void
}) {
  if (!gs) return null
  return (
    <FlexRow>
      <FlexColumn style={{ flexGrow: 2, height: '75px' }}>
        <GearSetHeader gearSet={gs} compact editable={false} />
        <div style={{ display: 'flex', gap: 4 }}>
          <Type size="XS">Raid: 0</Type>
          <Type size="XS">Tome: 0</Type>
          <Type size="XS">Twine: 0</Type>
          <Type size="XS">Brine: 0</Type>
        </div>
      </FlexColumn>

      <Button
        label=">"
        onClick={() => {
          onOpenPriority(gs)
        }}
        style={{
          backgroundColor: isSelected === gs.id ? Color.bg1 : Color.accent,
        }}
      />
      {/* {isSelected === gs.id && (
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: '35px solid transparent',
            borderBottom: '35px solid transparent',
            borderRight: `35px solid ${Color.bg1}`,
            // border: 'solid black',
            // borderWidth: '0 16px 16px 0',
            // display: 'inline-block',
            // padding: '16px',
            position: 'absolute',
            top: '40%',
            right: -30,
            zIndex: 999,
            transform: 'translate(0, -50%)',
          }}
        />
      )} */}
    </FlexRow>
  )
}

function compareGearSetIndicies(o: GearSet[], c: GearSet[]) {
  let isDifferent = false
  if (o.length != c.length) return true
  o.forEach((gs, i) => {
    isDifferent = isDifferent || gs.id !== c[i].id
  })
  return isDifferent
}

export function GearSetPriority({
  gearSets,
  onOpenPriority,
  isSelected,
}: {
  gearSets: GearSet[]
  onOpenPriority: (gs: GearSet) => void
  isSelected?: string
}) {
  const [sets, setSets] = useState(gearSets)
  const { saveGearSets } = useSiteContext()

  useEffect(() => {
    setSets(gearSets)
  }, [gearSets])

  const hasUnsavedChanges = useMemo(() => {
    const isChanged = compareGearSetIndicies(gearSets, sets)
    return isChanged
  }, [sets, gearSets])

  return (
    <div style={{ height: '70vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
      <DragAndDropCard<GearSet>
        items={sets}
        setItems={(i) => setSets(i)}
        title="Gear Set Priority"
        id="gsPrios"
        Component={({ item }) => (
          <GearSetDisplay
            gs={item}
            onOpenPriority={onOpenPriority}
            isSelected={isSelected}
          />
        )}
        actions={
          hasUnsavedChanges
            ? [
                {
                  label: 'Save',
                  onClick: () => {
                    saveGearSets({
                      existingGearSets: sets,
                    })
                  },
                },
              ]
            : []
        }
      />
    </div>
  )
}
