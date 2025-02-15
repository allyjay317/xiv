import { useState } from 'react'

import { JobSelector } from './JobSelector'
import { GearSet, Jobs } from '../../utils/types'
import { JobInfo } from '../../utils/constants'
import { Type } from '../common/Type'
import { Color } from '../../utils/colorSchemes'
import { IconButton } from '../common/IconButton'
import { useSiteContext } from '../context/useSiteContext'

export function Job({
  gearSet,
  editable,
}: {
  gearSet: GearSet
  editable: boolean
}) {
  const [isEditingJob, setIsEditingJob] = useState(false)
  const { updateGearSet } = useSiteContext()

  const jobInfo = JobInfo[gearSet.job as Jobs]
  return (
    <Type
      color={Color.fg1}
      size="M"
      style={{ display: 'flex', height: '32px' }}
    >
      {isEditingJob ? (
        <>
          <JobSelector
            value={`${gearSet.job}`}
            onSelect={(job: Jobs) => {
              updateGearSet({ ...gearSet, job })
              setIsEditingJob(false)
            }}
          />
          <IconButton
            onClick={() => setIsEditingJob(!isEditingJob)}
            icon="cancel"
          />
        </>
      ) : (
        <>
          {jobInfo.name}
          {editable && (
            <IconButton
              onClick={() => setIsEditingJob(!isEditingJob)}
              icon="pen"
            />
          )}
        </>
      )}
    </Type>
  )
}
