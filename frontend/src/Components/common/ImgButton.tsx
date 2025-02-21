import { Color } from '../../utils/colorSchemes'
import { Size } from '../../utils/types'
import { getSize } from './utils'
import styled from '@emotion/styled'

const Image = styled.img<{ color: string; size: number }>`
  border-radius: 50%;
  cursor: pointer;
  border: 4px solid ${(props) => props.color};
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  vertical-align: middle;
`

export function ImgButton({
  label,
  color,
  src,
  onClick,
  size,
  innerRef,
}: {
  label: string
  color?: string
  src: string
  onClick: VoidFunction
  size: Size
  innerRef?: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div ref={innerRef}>
      <Image
        color={color || Color.fg1}
        size={getSize(size)}
        src={src}
        onClick={onClick}
        aria-label={label}
      />
    </div>
  )
}
