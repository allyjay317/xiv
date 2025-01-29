import { JobInfo } from "../../utils/constants"
import { GearSet, Jobs } from "../../utils/types"
import { Select } from "../common/Select"
import { useSiteContext } from "../context/useSiteContext"


export function JobSelector({ gearSet }: { gearSet: GearSet }) {
  const { updateGearSet } = useSiteContext()

  const changeJob = (job: Jobs) => {
    updateGearSet({ ...gearSet, job })
  }

  const onChange = (value: string) => {
    changeJob(value as unknown as Jobs)
  }

  const options = Object.keys(Jobs).filter(k => !isNaN(Number(k))).map(job => ({
    label: JobInfo[job as unknown as Jobs].name,
    value: job,
  }))

  return <Select onChange={onChange} options={options} value={`${gearSet.job}`} />
}
