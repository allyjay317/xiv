import styled from '@emotion/styled'
import { Color } from '../../utils/colorSchemes'
import { getSize } from './utils'
import { Size } from '../../utils/types'

const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 4px;
  margin: 0px 0px;
  border-radius: 8px;
  font-family: FFXIV;
  width: 100%;
  overflow: auto;
  filter: drop-shadow(2px 2px ${Color.fg1});
  min-width: 200px;
  background: ${Color.bg1};
  border: 2px solid ${Color.fg1};
  color: ${Color.fg1};
`

export function TextInput({
  onChange,
  value,
  size = 'S',
  width,
  style,
  ...inputProps
}: {
  onChange: (s: string) => void
  value: string
  size?: Size
  width?: number
} & Partial<
  Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'css' | 'size'>
>) {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <Input
      style={{
        fontSize: `${getSize(size)}px`,
        height: `${getSize(size) / 10}rem`,
        minWidth: `${width}px`,
        width: `${width}px`,
        ...style,
      }}
      type="text"
      onChange={onInputChange}
      value={value}
      {...inputProps}
    />
  )
}
