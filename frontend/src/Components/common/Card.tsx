import { Color } from '../../utils/colorSchemes'
import { Type } from './Type'

export function Card({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div
      style={{
        backgroundColor: Color.bg2,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '200px',
        filter: `drop-shadow(3px 3px ${Color.bg1})`,
        padding: '16px',
        maxHeight: 'fit-content',
        gap: 4,
        border: `1px solid ${Color.bg1}`,
      }}
    >
      {title && <Type size="M">{title}</Type>}
      {children}
    </div>
  )
}
