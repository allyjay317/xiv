import { HEADER_HEIGHT } from '../../utils/constants'

export function ImgButton({
  label,
  color,
  src,
  onClick,
}: {
  label: string
  color?: string
  src: string
  onClick: VoidFunction
}) {
  return (
    <img
      src={src}
      style={{
        borderRadius: '50%',
        cursor: 'pointer',
        border: `4px solid ${color || 'white'}`,
        height: `${HEADER_HEIGHT - 16}px`,
        width: `${HEADER_HEIGHT - 16}px`,
      }}
      onClick={onClick}
      aria-label={label}
    />
  )
}
