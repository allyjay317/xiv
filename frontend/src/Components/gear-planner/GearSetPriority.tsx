import { GearSet } from '../../utils/types'
import { DragAndDropCard } from '../common/Card'
import { GearSetHeader } from '../GearSet/GearSetHeader'
import { Type } from '../common/Type'
import { useEffect, useState } from 'react'
import { useSiteContext } from '../context/useSiteContext'
import { FlexColumn, FlexRow } from '../common/Layout'
import { Button } from '../common/Button'

function GearSetDisplay({
  gs,
  onOpenPriority,
}: {
  gs?: GearSet
  onOpenPriority: (gs: GearSet) => void
}) {
  if (!gs) return null
  return (
    <FlexRow>
      <FlexColumn style={{ flexGrow: 2 }}>
        <GearSetHeader gearSet={gs} compact editable={false} />
        <div style={{ display: 'flex', gap: 4 }}>
          <Type size="XS">Raid: 0</Type>
          <Type size="XS">Tome: 0</Type>
          <Type size="XS">Twine: 0</Type>
          <Type size="XS">Brine: 0</Type>
        </div>
      </FlexColumn>

      <Button label=">" onClick={() => onOpenPriority(gs)} />
    </FlexRow>
  )
}

export function GearSetPriority({
  gearSets,
  onOpenPriority,
}: {
  gearSets: GearSet[]
  onOpenPriority: (gs: GearSet) => void
}) {
  const [sets, setSets] = useState(gearSets)
  const { saveGearSets } = useSiteContext()

  useEffect(() => {
    setSets(gearSets)
  }, gearSets)

  return (
    <DragAndDropCard<GearSet>
      items={sets}
      setItems={(i) => setSets(i)}
      title="Gear Set Priority"
      id="gsPrios"
      Component={({ item }) => (
        <GearSetDisplay gs={item} onOpenPriority={onOpenPriority} />
      )}
      actions={[
        {
          label: 'Save',
          onClick: () => {
            saveGearSets({
              existingGearSets: sets,
            })
          },
        },
      ]}
      width="300px"
    />
  )
}
