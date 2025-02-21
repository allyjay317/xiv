import styled from '@emotion/styled'
import { useMemo, useState } from 'react'

import { SourceSelector } from './SourceSelector'
import { Color } from '../../utils/colorSchemes'
import { GearPiece, GearSource, Jobs, Slot } from '../../utils/types'
import { JobInfo, PIECE_SIZE, SLOT_INFO } from '../../utils/constants'
import { Type } from '../common/Type'
import { Checkbox } from '../common/Checkbox'

import { ffIcons } from './util'
import { useMediaQuery } from '@react-hook/media-query'

const GearPieceContainer = styled.div<{ compact?: boolean }>`
  background-color: ${Color.bg2};
  border: 1px solid ${Color.bg3};
  border-radius: 16px;
  overflow: hidden;
  padding: 8px;
  position: relative;
  text-align: left;
  width: ${(props) => (props.compact ? '142px' : '200px')};
  height: 48px;
`

const GearPieceInner = styled.div<{ compact?: boolean }>`
  align-items: center;
  display: flex;
  gap: ${(props) => (props.compact ? 4 : 8)}px;
  justify-content: flex-start;
  height: 100%;
`

const SlotText = styled.div`
  justify-self: flex-start;
  text-align: left;
  align-self: center;
  width: 80px;
`

export function GearPieceDisplay({
  gearPiece,
  slot,
  job,
  onEdit,
}: {
  gearPiece: GearPiece
  slot: Slot
  job: Jobs
  onEdit: (props: { slot: Slot; value: GearPiece }) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  // const [isDisplayingMateria, setIsDisplayingMateria] = useState(false)
  const query = useMediaQuery('only screen and (min-width: 1020px)')

  const raidSourceImage = useMemo(() => {
    const floor = SLOT_INFO[slot].floor
    switch (floor) {
      case 1:
        return ffIcons.floor1
      case 2:
        return ffIcons.floor2
      case 3:
        return ffIcons.floor3
      case 4:
        return ffIcons.floor4
    }
  }, [slot])

  const imageSource = useMemo(() => {
    switch (gearPiece.source) {
      case GearSource.TOME:
        return ffIcons.tome
      case GearSource.RAID:
        return raidSourceImage
      case GearSource.CHAOTIC:
        return ffIcons.chaotic
      case GearSource.ULTIMATE:
        return ffIcons.ultimate
      case GearSource.CRAFTED:
        return ffIcons.crafted
      default:
        return 's'
    }
  }, [gearPiece.source, raidSourceImage])

  const changeSource = (source: GearSource) => {
    if (source !== gearPiece.source) {
      onEdit({
        slot,
        value: { ...gearPiece, augmented: false, have: false, source },
      })
    }
    setIsEditing(false)
  }

  const isLeftSide = useMemo(
    () =>
      [Slot.BODY, Slot.FEET, Slot.HANDS, Slot.HEAD, Slot.HEAD].includes(slot),
    [slot],
  )

  return (
    <GearPieceContainer compact={!query}>
      <GearPieceInner compact={!query}>
        {query ? (
          <SlotText>
            <Type color={Color.fg1} inline size="S">
              {SLOT_INFO[slot].name}
            </Type>
          </SlotText>
        ) : (
          <img
            src={
              slot === Slot.WEAPON ? JobInfo[job].icon : SLOT_INFO[slot].icon
            }
            style={{
              height: '24px',
              width: '24px',
              display: isEditing ? 'none' : 'block',
            }}
          />
        )}

        {isEditing ? (
          <SourceSelector
            onClick={changeSource}
            raidImage={raidSourceImage}
            isWeapon={slot === Slot.WEAPON}
            isLeftSide={isLeftSide}
          />
        ) : (
          <>
            <div
              onClick={() => setIsEditing(true)}
              style={{ cursor: 'pointer' }}
            >
              <img
                alt="book"
                height={PIECE_SIZE}
                src={imageSource}
                width={PIECE_SIZE}
              />
            </div>
            <Checkbox
              label="Have"
              onChange={(isChecked) => {
                onEdit({
                  slot,
                  value: { ...gearPiece, have: isChecked },
                })
              }}
              value={gearPiece.have}
            />
            {gearPiece.source === GearSource.TOME && (
              <Checkbox
                label="Aug"
                onChange={(isChecked) => {
                  onEdit({
                    slot,
                    value: { ...gearPiece, augmented: isChecked },
                  })
                }}
                value={gearPiece.augmented}
              />
            )}
          </>
        )}
      </GearPieceInner>
      {/* {isDisplayingMateria && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            marginBottom: '8px',
          }}
        >
          <div
            style={{ backgroundColor: 'green', height: '50px', width: '50%' }}
          />
          <div
            style={{ backgroundColor: 'green', height: '50px', width: '50%' }}
          />
        </div>
      )}

      <div
        onClick={() => setIsDisplayingMateria(!isDisplayingMateria)}
        style={{
          backgroundColor: 'red',
          height: '10px',
          left: '0',
          marginBottom: '-9px',
          position: 'absolute',
          width: '100%',
        }}
      /> */}
    </GearPieceContainer>
  )
}
