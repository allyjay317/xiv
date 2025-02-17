import { GearSetContainer } from './GearSetContainer'
import { Header } from './Header'
import { GearSet, Jobs } from '../../utils/types'
import { gearSet } from '../../Fixtures/GearSet'
import { useSiteContext } from '../context/useSiteContext'
import { NEW_GEARSET } from '../context/constants'
import { useState } from 'react'

export function GearSetList() {
  const {
    characters,
    selectedCharacter,
    deleteGearSet,
    saveGearSets,
    updateGearSet,
  } = useSiteContext()
  const [newGearSets, setNewGearSets] = useState<GearSet[]>([])

  const gearSets = selectedCharacter
    ? characters[selectedCharacter]?.gearSets
    : []

  const onDelete = (id: string) =>
    setNewGearSets(newGearSets.filter((s) => s.id !== id))

  const onEdit = (gearSet: GearSet) => {
    if (gearSet.id.startsWith(NEW_GEARSET)) {
      setNewGearSets(
        newGearSets.map((gs) => (gs.id === gearSet.id ? gearSet : gs)),
      )
    } else {
      updateGearSet(gearSet)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <Header
        onAdd={(job: Jobs) => {
          setNewGearSets([
            ...newGearSets,
            {
              ...gearSet,
              id: `${NEW_GEARSET} - ${Math.random()}`,
              job,
            },
          ])
        }}
        onSave={async () => {
          await saveGearSets({ newGearSets })
          setNewGearSets([])
        }}
        hasNewGearSets={newGearSets.length > 0}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          margin: '16px',
        }}
      >
        {gearSets.map((set) => (
          <GearSetContainer
            key={set.id}
            gearSet={set}
            onDelete={deleteGearSet}
            onEdit={onEdit}
          />
        ))}
        {newGearSets.map((set) => (
          <GearSetContainer
            key={set.id}
            gearSet={set}
            onDelete={() => onDelete(set.id)}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  )
}
