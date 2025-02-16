import styled from '@emotion/styled'
import { Color } from '../../utils/colorSchemes'
import { useMediaQuery } from '@react-hook/media-query'
import { Type } from './Type'
import { Size } from '../../utils/types'
import { useMemo } from 'react'

const ButtonContainer = styled.div<{ state?: 'disabled' | 'default' }>`
  background-color: ${Color.bg1};
  border: 1px solid ${Color.fg1};
  border-radius: 4px;
  cursor: pointer;
  filter: drop-shadow(7px 5px 4px rgba(0, 0, 0, 0.25));
  padding: 12px 10px;
  text-align: center;
  box-sizing: border-box;
  transition: 120ms filter ease-in-out;

  max-width: 200px;
  color: ${Color.fg1};
  ${(props) =>
    props.state === 'disabled'
      ? ''
      : `&:hover {
    filter: drop-shadow(15px 10px 4px rgba(0, 0, 0, 0.25));
    background-color: ${Color.bg2};
    left: 5px';
    top: 5px;
  };`}
`

export function Button({
  label,
  onClick,
  style,
  state,
  width = 'fit-content',
  size = 'S',
  ...buttonProps
}: {
  label: string
  onClick?: () => void
  style?: React.CSSProperties
  state?: 'default' | 'disabled'
  width?: string
  size?: Size
} & React.ComponentProps<'div'>) {
  const query = useMediaQuery('only screen and (min-width: 1020px)')
  const baseOnClick = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    onClick && onClick()
  }

  const adjustedSize = useMemo(() => {
    if (query || size === 'XS') return size
    switch (size) {
      case 'XL':
        return 'L'
      case 'L':
        return 'M'
      case 'M':
        return 'S'
      case 'S':
        return 'XS'
    }
  }, [query, size])

  return (
    <ButtonContainer
      onClick={baseOnClick}
      style={{
        ...style,
        color: state === 'disabled' ? Color.bg3 : (style?.color ?? Color.fg1),
        cursor: state === 'disabled' ? 'default' : 'pointer',
        width: width,
      }}
      state={state}
      {...buttonProps}
    >
      <Type size={adjustedSize}>{label}</Type>
    </ButtonContainer>
  )
}
