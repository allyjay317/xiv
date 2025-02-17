import { GearSet } from '../../utils/types'
import { Card, DragableCard } from '../common/Card'
import { GearSetHeader } from '../GearSet/GearSetHeader'
import { Type } from '../common/Type'
import { useState } from 'react'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { useSiteContext } from '../context/useSiteContext'

function GearSetDisplay({ gs }: { gs?: GearSet }) {
  if (!gs) return null
  return (
    <>
      <GearSetHeader gearSet={gs} compact editable={false} />
      <div style={{ display: 'flex', gap: 4 }}>
        <Type size="XS">Raid: 0</Type>
        <Type size="XS">Tome: 0</Type>
        <Type size="XS">Twine: 0</Type>
        <Type size="XS">Brine: 0</Type>
      </div>
    </>
  )
}

export function GearSetPriority({ gearSets }: { gearSets: GearSet[] }) {
  const [sets, setSets] = useState(gearSets)
  const { saveGearSets } = useSiteContext()

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return
    if (destination.index === source.index) {
      return
    }
    const movedSet = sets.find((s) => s.id === draggableId)
    if (!movedSet) return

    const newSets = [...sets]
    newSets.splice(source.index, 1)
    newSets.splice(destination.index, 0, movedSet)
    setSets(newSets)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card
        title="Gear Set Priority"
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
      >
        <Droppable droppableId="gsPrios">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sets.map((gs, index) => (
                <DragableCard id={gs.id} key={gs.id} index={index}>
                  <GearSetDisplay gs={gs} />
                </DragableCard>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </DragDropContext>
  )
}
