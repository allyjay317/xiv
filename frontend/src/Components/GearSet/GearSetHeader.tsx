import { useState } from 'react'
import { JobInfo } from '../../utils/constants'
import { GearSet, Jobs } from '../../utils/types'
import { FlexColumn, FlexRow } from '../common/Layout'
import { Job } from './Job'
import { Name } from './Name'
import styled from '@emotion/styled'
import { JobSelector } from './JobSelector'
import { Color } from '../../utils/colorSchemes'

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
  onEdit,
}: {
  gearSet: GearSet
  compact?: boolean
  editable?: boolean
  onEdit?: (gearSet: GearSet) => void
}) {
  const [isJobMenuOpen, setIsJobMenuOpen] = useState(false)
  const jobInfo = JobInfo[gearSet.job as Jobs]

  const onChangeJob = (job: Jobs) => {
    onEdit && onEdit({ ...gearSet, job })
    setIsJobMenuOpen(false)
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
        <Name
          gearSet={gearSet}
          compact={compact}
          editable={editable}
          onEdit={onEdit}
        />
        {!compact && <Job gearSet={gearSet} />}
        {isJobMenuOpen && (
          <div style={{ position: 'absolute', backgroundColor: Color.bg1 }}>
            <JobSelector
              type="list"
              onSelect={onChangeJob}
              value={`${gearSet.job}`}
              size="M"
            />
          </div>
        )}
      </FlexColumn>
    </Container>
  )
}
