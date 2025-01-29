import styled from '@emotion/styled'
import { ComponentProps, useMemo } from 'react'

import { GearPieceDisplay } from './GearPiece'
import { Job } from './Job'
import { Name } from './Name'
import { GearSet, Jobs, Slot } from '../../utils/types'
import { JobInfo } from '../../utils/constants'
import { Color } from '../../utils/colorSchemes'
import { Button } from '../common/Button'
import { useSiteContext } from '../context/useSiteContext'
import { MenuButton } from '../common/MenuButton'
import { NEW_GEARSET } from '../context/constants'

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

function withId(id: string) {
  return function GearPiece(
    props: Omit<ComponentProps<typeof GearPieceDisplay>, 'id'>
  ) {
    return <GearPieceDisplay {...props} id={id} />
  }
}

export function GearSetContainer({
  gearSet,
  onDelete,
}: {
  gearSet: GearSet
  onDelete: (id: string) => void
}) {
  const jobInfo = JobInfo[gearSet.job as Jobs]
  
  const {characters, saveGearSet, currentlySelectedCharacter} = useSiteContext()

  const onSave = () => {
    saveGearSet(gearSet)
  }

  const GearPiece = withId(gearSet.id)

  const characterItems = useMemo(() => {
    return Object.keys(characters).filter(c => c !== currentlySelectedCharacter).map(c => {
      return {
        label: characters[c].info.name,
        onClick: () => saveGearSet({...gearSet, id: NEW_GEARSET}, `${characters[c].info.id}`)
        
      }
    })
  }, [characters])

  return (
    <div>
      <div
        style={{
          backgroundColor: Color.bg1,
          border: `1px solid ${Color.fg1}`,
          borderRadius: '5%',
          padding: '16px',
          position: 'relative',
          width: 'fit-content',
        }}
      >
        <div
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: '32px',
            top: '32px',
            display: 'flex'
          }}
        >
        {gearSet.modified && <Button label='Save' onClick={onSave} state={gearSet.modified ? 'default' : 'disabled'}/>}
          
          <MenuButton direction='right' width='10px' label=':' onClick={() => {}} menuItems={[
            {label: 'Delete', onClick: () => onDelete(gearSet.id)}, 
            {label: <MenuButton label='Copy to Another Character' menuItems={characterItems} direction='right' />, onClick: () => {}}
            ]}  />
        </div>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <img
            alt="job icon"
            src={jobInfo.icon}
            style={{ height: '70px', width: '70px' }}
          />
          <div>
            <Name gearSet={gearSet} />
            <Job gearSet={gearSet} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Column>
            <GearPiece gearPiece={gearSet.items[Slot.WEAPON]} slot={Slot.WEAPON} />
            <GearPiece gearPiece={gearSet.items[Slot.HEAD]} slot={Slot.HEAD} />
            <GearPiece gearPiece={gearSet.items[Slot.BODY]} slot={Slot.BODY} />
            <GearPiece gearPiece={gearSet.items[Slot.HANDS]} slot={Slot.HANDS} />
            <GearPiece gearPiece={gearSet.items[Slot.LEGS]} slot={Slot.LEGS} />
            <GearPiece gearPiece={gearSet.items[Slot.FEET]} slot={Slot.FEET} />
          </Column>
          <Column>
            <GearPiece
              gearPiece={gearSet.items[Slot.EARRINGS]}
              slot={Slot.EARRINGS}
            />
            <GearPiece
              gearPiece={gearSet.items[Slot.NECKLACE]}
              slot={Slot.NECKLACE}
            />
            <GearPiece
              gearPiece={gearSet.items[Slot.BRACELET]}
              slot={Slot.BRACELET}
            />
            <GearPiece gearPiece={gearSet.items[Slot.RING1]} slot={Slot.RING1} />
            <GearPiece gearPiece={gearSet.items[Slot.RING2]} slot={Slot.RING2} />
          </Column>
        </div>
      </div>
    </div>
  )
}
