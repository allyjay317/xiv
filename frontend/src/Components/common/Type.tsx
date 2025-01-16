import { useMemo } from 'react'
import { Color } from '../../utils/colorSchemes'
import { DataCenter, Server } from '../../utils/types'


export function Type({
  bold,
  children,
  color,
  inline,
  size,
  style,
}: {
  children: React.ReactNode
  inline?: boolean
  style?: React.CSSProperties
  size: 'S' | 'M' | 'L' | 'XS'
  bold?: boolean
  color?: string
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
    >
      {children}
    </span>
  ) : (
    <div
      className="type"
      style={{ color: color || Color.fg1, fontFamily, fontSize, ...style }}
    >
      {children}
    </div>
  )
}

export type XIVUserInfo = {
  Avatar: string
  Bio: string
  DC: DataCenter
  Gender: number
  ID: number
  Name: string
  Portrait: string
  Server: Server
  Title: {
    ID: number
    Icon: string
    Name_de: string
    Name_en: string
    Name_fr: string
    Name_ja: string
  }
  TitleTop: boolean
}