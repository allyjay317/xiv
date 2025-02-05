import { useMemo } from 'react'
import { Color } from '../../utils/colorSchemes'
import { getSize } from './utils'
import { Size } from '../../utils/types'

export function Type({
  bold,
  children,
  color,
  inline,
  size,
  style,
  onClick,
}: {
  children: React.ReactNode
  inline?: boolean
  style?: React.CSSProperties
  size: Size
  bold?: boolean
  color?: string
  onClick?: VoidFunction
}) {
  const fontSize = useMemo(() => getSize(size), [size])

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
