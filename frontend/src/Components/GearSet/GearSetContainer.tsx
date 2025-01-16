import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import { GearPieceDisplay } from './GearPiece'
import { Job } from './Job'
import { Name } from './Name'
import { GearSet, Jobs, Slot } from '../../utils/types'
import { JobInfo } from '../../utils/constants'
import { Color } from '../../utils/colorSchemes'

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

  const GearPiece = withId(gearSet.id)

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
          onClick={() => onDelete(gearSet.id)}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: '32px',
            top: '32px',
          }}
        >
          X
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
            <GearPiece gearPiece={gearSet.items.Weapon} slot={Slot.WEAPON} />
            <GearPiece gearPiece={gearSet.items.Head} slot={Slot.HEAD} />
            <GearPiece gearPiece={gearSet.items.Body} slot={Slot.BODY} />
            <GearPiece gearPiece={gearSet.items.Hands} slot={Slot.HANDS} />
            <GearPiece gearPiece={gearSet.items.Legs} slot={Slot.LEGS} />
            <GearPiece gearPiece={gearSet.items.Feet} slot={Slot.FEET} />
          </Column>
          <Column>
            <GearPiece
              gearPiece={gearSet.items.Earrings}
              slot={Slot.EARRINGS}
            />
            <GearPiece
              gearPiece={gearSet.items.Necklace}
              slot={Slot.NECKLACE}
            />
            <GearPiece
              gearPiece={gearSet.items.Bracelet}
              slot={Slot.BRACELET}
            />
            <GearPiece gearPiece={gearSet.items.Ring1} slot={Slot.RING1} />
            <GearPiece gearPiece={gearSet.items.Ring2} slot={Slot.RING2} />
          </Column>
        </div>
      </div>
    </div>
  )
}
