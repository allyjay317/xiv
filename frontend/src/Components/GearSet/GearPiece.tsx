import styled from '@emotion/styled'
import { useMemo, useState } from 'react'

import { SourceSelector } from './SourceSelector'
import { Color } from '../../utils/colorSchemes'
import { GearPiece, GearSource, Slot } from '../../utils/types'
import { PIECE_SIZE, SLOT_INFO } from '../../utils/constants'
import { Type } from '../common/Type'
import { Checkbox } from '../common/Checkbox'

import tomeImg from '../../assets/img/gear_sources/tomestone.png'
import rOneImg from '../../assets/img/gear_sources/book1.png'
import rTwoImg from '../../assets/img/gear_sources/book2.png'
import rThreeImg from '../../assets/img/gear_sources/book3.png'
import rFourImg from '../../assets/img/gear_sources/book4.png'
import ultimateSourceImage from '../../assets/img/gear_sources/ultimate.png'
import chaoticSourceImage from '../../assets/img/gear_sources/FFXIV_Chaotic_Icon.webp'
import craftedSourceImage from '../../assets/img/gear_sources/crafted.webp'
import { useSiteContext } from '../context/useSiteContext'

const GearPieceContainer = styled.div({
  backgroundColor: Color.bg2,
  border: `1px solid ${Color.fg1}`,
  borderRadius: '16px',
  overflow: 'hidden',
  padding: '8px',
  position: 'relative',
  textAlign: 'left',
  width: '250px',
  height: '48px'
})

const GearPieceInner = styled.div({
  alignItems: 'center',
  display: 'flex',
  gap: '8px',
  justifyContent: 'flex-start',
  height: '100%'
})

const SlotText = styled.div({
  justifySelf: 'flex-start',
  textAlign: 'left',
  alignSelf: 'center',
  width: '100px',
})

export function GearPieceDisplay({
  gearPiece,
  id,
  slot,
}: {
  gearPiece: GearPiece
  slot: Slot
  id: string
}) {
  const [isEditing, setIsEditing] = useState(false)
  // const [isDisplayingMateria, setIsDisplayingMateria] = useState(false)
  const { updateGearPiece } = useSiteContext()

  const raidSourceImage = useMemo(() => {
    const floor = SLOT_INFO[slot].floor
    switch(floor){
      case 1:
        return rOneImg
      case 2:
        return rTwoImg
      case 3:
        return rThreeImg
      case 4:
        return rFourImg
    }
  }, [slot])

  const imageSource = useMemo(() => {
    switch(gearPiece.source){
      case GearSource.TOME:
        return tomeImg
      case GearSource.RAID:
        return raidSourceImage
      case GearSource.CHAOTIC:
        return chaoticSourceImage
      case GearSource.ULTIMATE:
        return ultimateSourceImage
      case GearSource.CRAFTED:
        return craftedSourceImage
      default:
        return 's'
    }
  }, [gearPiece.source, raidSourceImage])

  const changeSource = (source: GearSource) => {
    if (source !== gearPiece.source) {
      updateGearPiece({
        id,
        slot,
        value: { augmented: false, have: false, source },
      })
    }
    setIsEditing(false)
  }

  const isLeftSide = useMemo(() => 
    [Slot.BODY, Slot.FEET, Slot.HANDS, Slot.HEAD, Slot.HEAD].includes(slot), [slot])

  return (
    <GearPieceContainer>
      <GearPieceInner>
        <SlotText>
          <Type color={Color.fg1} inline size="S">
            {SLOT_INFO[slot].name}
          </Type>
        </SlotText>
        {isEditing ? (
          <SourceSelector onClick={changeSource} raidImage={raidSourceImage} isWeapon={slot === Slot.WEAPON} isLeftSide={isLeftSide} />
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
              onChange={isChecked => {
                updateGearPiece({
                  id,
                  slot,
                  value: { ...gearPiece, have: isChecked },
                })
              }}
              value={gearPiece.have}
            />
            {gearPiece.source === GearSource.TOME && (
              <Checkbox
                label="Aug"
                onChange={isChecked => {
                  updateGearPiece({
                    id,
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
