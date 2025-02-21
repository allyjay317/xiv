import { Color } from '../../utils/colorSchemes'

export type Option = {
  label: string | undefined
  value: string
  img?: string
}

export function Select({
  onChange,
  options,
  value,
}: {
  options: Option[]
  value: string | undefined
  onChange: (value: string) => void
}) {
  return (
    <select
      onChange={(e) => {
        onChange(e.target.value)
      }}
      style={{
        backgroundColor: Color.bg1,
        border: `1px solid ${Color.fg3}`,
        borderRadius: '4px',
        color: Color.fg1,
        display: 'inline',
        fontFamily: 'FFXIVBold',
        fontSize: '16px',
        height: '32px',
        minWidth: '200px',
        padding: '4px',
        width: '100%',
      }}
      value={value}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {/* {option.img && <img src={option.img} />} */}
            {option.label ?? value}
          </option>
        )
      })}
    </select>
  )
}
