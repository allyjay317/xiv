import { GearSource } from '../../utils/types'

import tomeSourceImg from '../../assets/img/gear_sources/tomestone.png'
import ultimateSourceImg from '../../assets/img/gear_sources/ultimate.png'
import chaoticSourceImg from '../../assets/img/gear_sources/FFXIV_Chaotic_Icon.webp'
import craftedSourceImg from '../../assets/img/gear_sources/crafted.webp'
import styled from '@emotion/styled'
import { PIECE_SIZE } from '../../utils/constants'

const SourceContainer = styled.div`
  cursor: pointer;
  width: ${PIECE_SIZE};
  height: ${PIECE_SIZE};
`

const SourceImg = styled.img`
  width: ${PIECE_SIZE};
  height: ${PIECE_SIZE};
`

export function SourceSelector({
  onClick,
  raidImage,
  isWeapon,
  isLeftSide,
}: {
  onClick: (source: GearSource) => void
  raidImage?: string
  isWeapon?: boolean
  isLeftSide?: boolean
}) {
  return (
    <>
      <SourceContainer onClick={() => onClick(GearSource.RAID)}>
        <SourceImg alt="Raid" src={raidImage} />
      </SourceContainer>
      <SourceContainer onClick={() => onClick(GearSource.TOME)}>
        <SourceImg alt="Tomestone" src={tomeSourceImg} />
      </SourceContainer>
      {isLeftSide && (
        <SourceContainer onClick={() => onClick(GearSource.CHAOTIC)}>
          <SourceImg alt="Chaotic" src={chaoticSourceImg} />
        </SourceContainer>
      )}
      {isWeapon && (
        <SourceContainer onClick={() => onClick(GearSource.ULTIMATE)}>
          <SourceImg alt="Ultimate" src={ultimateSourceImg} />
        </SourceContainer>
      )}
      <SourceContainer onClick={() => onClick(GearSource.CRAFTED)}>
        <SourceImg alt="Crafted" src={craftedSourceImg} />
      </SourceContainer>
    </>
  )
}
