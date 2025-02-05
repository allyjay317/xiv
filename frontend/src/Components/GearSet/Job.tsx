import { useState } from 'react'

import { JobSelector } from './JobSelector'
import { GearSet, Jobs } from '../../utils/types'
import { JobInfo } from '../../utils/constants'
import { Type } from '../common/Type'
import { Color } from '../../utils/colorSchemes'
import { IconButton } from '../common/IconButton'

export function Job({ gearSet }: { gearSet: GearSet }) {
  const [isEditingJob, setIsEditingJob] = useState(false)

  const jobInfo = JobInfo[gearSet.job as Jobs]
  return (
    <Type color={Color.fg1} size="M">
      {isEditingJob ? (
        <>
          <JobSelector gearSet={gearSet} />
          <IconButton
            onClick={() => setIsEditingJob(!isEditingJob)}
            icon="pen"
          />
        </>
      ) : (
        <>
          {jobInfo.name}
          <IconButton
            onClick={() => setIsEditingJob(!isEditingJob)}
            icon="pen"
          />
        </>
      )}
    </Type>
  )
}
