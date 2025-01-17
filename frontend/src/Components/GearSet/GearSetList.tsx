import { v1 as uuid } from 'uuid'

import { GearSetContainer } from './GearSetContainer'
import { Header } from './Header'
import { useSiteContext } from '../context/SiteContext'
import { Jobs } from '../../utils/types'
import { gearSet } from '../Fixtures/GearSet'

export function GearSetList() {
  const { addGearSet, characters, currentlySelectedCharacter, deleteGearSet } =
    useSiteContext()

  const gearSets = currentlySelectedCharacter
    ? characters[currentlySelectedCharacter]?.gearSets
    : []

  return (
    <div style={{ position: 'relative' }}>
      <Header
        onAdd={(job: Jobs) => {
          addGearSet({
            ...gearSet,
            id: uuid(),
            job,
          })
        }}
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
        {gearSets.map(set => (
          <GearSetContainer
            key={set.id}
            gearSet={set}
            onDelete={deleteGearSet}
          />
        ))}
      </div>
    </div>
  )
}
