import { JobInfo } from '../../utils/constants'
import { GearSet, Jobs } from '../../utils/types'
import { Select } from '../common/Select'
import { useSiteContext } from '../context/useSiteContext'

export function JobSelector({
  gearSet,
  onSelect,
}: {
  gearSet: GearSet
  onSelect?: (job: Jobs) => void
}) {
  const { updateGearSet } = useSiteContext()

  const onChange = (value: string) => {
    const job = value as unknown as Jobs
    updateGearSet({ ...gearSet, job })
    if (onSelect) onSelect(job)
  }

  const options = Object.keys(Jobs)
    .filter((k) => !isNaN(Number(k)))
    .map((job) => ({
      label: JobInfo[job as unknown as Jobs].name,
      value: job,
    }))

  return (
    <Select onChange={onChange} options={options} value={`${gearSet.job}`} />
  )
}
