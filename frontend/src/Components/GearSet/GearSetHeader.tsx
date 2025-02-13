import { JobInfo } from '../../utils/constants'
import { GearSet, Jobs } from '../../utils/types'
import { Job } from './Job'
import { Name } from './Name'

export function GearSetHeader({
  gearSet,
  compact = false,
  editable = true,
}: {
  gearSet: GearSet
  compact?: boolean
  editable?: boolean
}) {
  const jobInfo = JobInfo[gearSet.job as Jobs]
  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '16px',
      }}
    >
      <img
        alt="job icon"
        src={jobInfo.icon}
        style={
          compact
            ? { height: '24px', width: '24px' }
            : { height: '70px', width: '70px' }
        }
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'flex-start',
        }}
      >
        <Name gearSet={gearSet} compact={compact} editable={editable} />
        {!compact && <Job gearSet={gearSet} editable={editable} />}
      </div>
    </div>
  )
}
