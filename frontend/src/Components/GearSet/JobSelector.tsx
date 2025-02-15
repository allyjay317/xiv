import { JobInfo } from '../../utils/constants'
import { Jobs } from '../../utils/types'
import { FlexRow } from '../common/Layout'
import { Select } from '../common/Select'
import styled from '@emotion/styled'

const JobImg = styled.img`
  cursor: pointer;
  height: 50px;
  width: 50px;
  user-select: none;
`

export function JobSelector({
  onSelect,
  type = 'select',
  value,
}: {
  onSelect: (job: Jobs) => void
  type?: 'select' | 'list'
  value?: string
}) {
  const onChange = (value: string) => {
    const job = value as unknown as Jobs

    onSelect(job)
  }

  const options = Object.keys(Jobs)
    .filter((k) => !isNaN(Number(k)))
    .map((job) => ({
      label: JobInfo[job as unknown as Jobs].name,
      value: job,
      img: JobInfo[job as unknown as Jobs].icon,
    }))

  switch (type) {
    case 'select':
      return <Select onChange={onChange} options={options} value={value} />
    case 'list':
      return (
        <FlexRow wrap="wrap">
          {options.map((o) => (
            <JobImg
              key={o.value}
              alt={o.label}
              src={o.img}
              onClick={() => onChange(o.value)}
            />
          ))}
        </FlexRow>
      )
  }
}
