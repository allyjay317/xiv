import { GearSetContainer } from './GearSetContainer'
import { Header } from './Header'
import { GearSet, Jobs, Slot } from '../../utils/types'
import { gearSet } from '../../Fixtures/GearSet'
import { useSiteContext } from '../context/useSiteContext'
import { NEW_GEARSET } from '../context/constants'
import { useState } from 'react'
import { Button } from '../common/Button'
import { FlexRow } from '../common/Layout'
import { gearsets } from '../../api/gearset'
import { useMediaQuery } from '@react-hook/media-query'

export function GearSetList() {
  const {
    characters,
    selectedCharacter,
    deleteGearSet,
    saveGearSets,
    updateGearSet,
    updateGearPiece,
  } = useSiteContext()
  const [newGearSets, setNewGearSets] = useState<GearSet[]>([])
  const [archivedSets, setArchivedSets] = useState<GearSet[]>([])
  const query = useMediaQuery('only screen and (min-width: 1020px)')

  const gearSets = selectedCharacter
    ? characters[selectedCharacter]?.gearSets
    : []

  const onDelete = (id: string) =>
    setNewGearSets(newGearSets.filter((s) => s.id !== id))

  const onEdit = (
    updateType: 'set' | 'piece',
    gearSet: GearSet,
    slot?: Slot,
  ) => {
    if (gearSet.id.startsWith(NEW_GEARSET)) {
      setNewGearSets(
        newGearSets.map((gs) => (gs.id === gearSet.id ? gearSet : gs)),
      )
    } else {
      switch (updateType) {
        case 'set':
          updateGearSet(gearSet)
          break
        case 'piece':
          if (slot === undefined) break
          updateGearPiece({
            id: gearSet.id,
            slot,
            value: gearSet.items[slot],
          })
          break
      }
    }
  }

  const onArchive = (id: string) => {
    const set = gearSets.find((gs) => gs.id === id)

    if (set) {
      updateGearSet({ ...set, archived: true })
      return
    }
  }

  const getArchivedSets = async () => {
    const sets = await gearsets.loadArchivedSets(selectedCharacter ?? '')

    setArchivedSets(sets)
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
          paddingTop: query ? undefined : '96px',
        }}
      >
        {gearSets.map((set) => (
          <GearSetContainer
            key={set.id}
            gearSet={set}
            onDelete={deleteGearSet}
            onEdit={onEdit}
            onArchive={onArchive}
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
      <FlexRow justify="center">
        <Button label="Load Archived Sets" onClick={getArchivedSets} />
      </FlexRow>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          margin: '16px',
        }}
      >
        {archivedSets.map((set) => (
          <GearSetContainer
            key={set.id}
            gearSet={set}
            onDelete={() => onDelete(set.id)}
          />
        ))}
      </div>
    </div>
  )
}
