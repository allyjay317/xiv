import { useMemo } from 'react'
import { Color } from '../../utils/colorSchemes'


export function Type({
  bold,
  children,
  color,
  inline,
  size,
  style,
  onClick
}: {
  children: React.ReactNode
  inline?: boolean
  style?: React.CSSProperties
  size: 'S' | 'M' | 'L' | 'XS'
  bold?: boolean
  color?: string
  onClick?: VoidFunction
}) {
  const fontSize = useMemo(() => {
    if (size === 'XS') return '12px'
    if (size === 'S') return '16px'
    if (size === 'M') return '24px'
    if (size === 'L') return '32px'
  }, [size])

  const fontFamily = bold ? 'FFXIVBold' : 'FFXIV'

  return inline ? (
    <span
      style={{
        color: color || Color.fg1,
        fontFamily,
        fontSize,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </span>
  ) : (
    <div
      className="type"
      style={{ color: color || Color.fg1, fontFamily, fontSize, ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export type XIVUserInfo = {
  avatar: string
  id: number
  name: string
  portrait: string
}