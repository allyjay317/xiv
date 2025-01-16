import { GearSource } from "../../utils/types"

import tomeImg from '../../assets/img/gear_sources/tomestone.png'


export function SourceSelector({
  onClick,
  raidImage,
}: {
  onClick: (source: GearSource) => void
  raidImage?: string
}) {
  return (
    <>
      <div
        onClick={() => onClick(GearSource.RAID)}
        style={{ cursor: 'pointer' }}
      >
        <img alt="Raid" src={raidImage} style={{ cursor: 'pointer' }} />
      </div>
      <div onClick={() => onClick(GearSource.TOME)}>
        <img
          alt="Tomestone"
          src={tomeImg}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </>
  )
}
