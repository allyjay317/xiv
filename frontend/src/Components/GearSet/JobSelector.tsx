import { JobInfo } from '../../utils/constants'
import { Jobs, Size } from '../../utils/types'
import { FlexRow } from '../common/Layout'
import { Select } from '../common/Select'
import styled from '@emotion/styled'
import { getSize } from '../common/utils'

const JobImg = styled.img<{ size: Size }>`
  cursor: pointer;
  height: ${({ size }) => getSize(size)}px;
  width: ${({ size }) => getSize(size)}px;
  user-select: none;
`

export function JobSelector({
  onSelect,
  type = 'select',
  value,
  size = 'XL',
}: {
  onSelect: (job: Jobs) => void
  type?: 'select' | 'list'
  value?: string
  size?: Size
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
    .sort((a, b) => {
      return (
        JobInfo[a.value as unknown as Jobs].role -
        JobInfo[b.value as unknown as Jobs].role
      )
    })

  switch (type) {
    case 'select':
      return <Select onChange={onChange} options={options} value={value} />
    case 'list':
      return (
        <FlexRow
          wrap="wrap"
          style={{
            width: size === 'XL' ? undefined : '250px',
          }}
        >
          {options.map((o) => (
            <JobImg
              key={o.value}
              alt={o.label}
              src={o.img}
              onClick={() => onChange(o.value)}
              size={size}
            />
          ))}
        </FlexRow>
      )
  }
}
