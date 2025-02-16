import { GearSet, Jobs } from '../../utils/types'
import { JobInfo } from '../../utils/constants'
import { Type } from '../common/Type'
import { Color } from '../../utils/colorSchemes'

export function Job({ gearSet }: { gearSet: GearSet }) {
  const jobInfo = JobInfo[gearSet.job as Jobs]
  return (
    <Type
      color={Color.fg1}
      size="M"
      style={{ display: 'flex', height: '32px' }}
    >
      {jobInfo.name}
    </Type>
  )
}
