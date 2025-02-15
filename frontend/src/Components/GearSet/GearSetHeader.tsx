import { useState } from 'react'
import { JobInfo } from '../../utils/constants'
import { GearSet, Jobs } from '../../utils/types'
import { FlexColumn, FlexRow } from '../common/Layout'
import { Job } from './Job'
import { Name } from './Name'
import styled from '@emotion/styled'
import { JobSelector } from './JobSelector'
import { useSiteContext } from '../context/useSiteContext'

const Container = styled(FlexRow)`
  margin-bottom: 16px;
`

const JobIcon = styled.img<{ compact: boolean }>`
  user-select: none;
  height: ${(props) => (props.compact ? '24px' : '70px')};
  width: ${(props) => (props.compact ? '24px' : '70px')};
`

export function GearSetHeader({
  gearSet,
  compact = false,
  editable = true,
}: {
  gearSet: GearSet
  compact?: boolean
  editable?: boolean
}) {
  const [isJobMenuOpen, setIsJobMenuOpen] = useState(false)
  const jobInfo = JobInfo[gearSet.job as Jobs]
  const { updateGearSet } = useSiteContext()

  const onChangeJob = (job: Jobs) => {
    updateGearSet({ ...gearSet, job })
  }

  return (
    <Container gap="16">
      <JobIcon
        alt="job icon"
        compact={compact}
        src={jobInfo.icon}
        onClick={editable ? () => setIsJobMenuOpen(!isJobMenuOpen) : undefined}
      />
      <FlexColumn gap="4" align="flex-start">
        <Name gearSet={gearSet} compact={compact} editable={editable} />
        {!compact && <Job gearSet={gearSet} editable={editable} />}
        {compact && isJobMenuOpen && (
          <JobSelector
            type="list"
            onSelect={onChangeJob}
            value={`${gearSet.job}`}
            size="M"
          />
        )}
      </FlexColumn>
    </Container>
  )
}
