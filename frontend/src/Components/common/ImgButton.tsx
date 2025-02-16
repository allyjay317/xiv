import { Size } from '../../utils/types'
import { getSize } from './utils'

export function ImgButton({
  label,
  color,
  src,
  onClick,
  size,
}: {
  label: string
  color?: string
  src: string
  onClick: VoidFunction
  size: Size
}) {
  return (
    <img
      src={src}
      style={{
        borderRadius: '50%',
        cursor: 'pointer',
        border: `4px solid ${color || 'white'}`,
        height: `${getSize(size)}px`,
        width: `${getSize(size)}px`,
        verticalAlign: 'middle',
      }}
      onClick={onClick}
      aria-label={label}
    />
  )
}
