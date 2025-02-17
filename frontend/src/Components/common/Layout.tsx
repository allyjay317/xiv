import styled from '@emotion/styled'
import { Color } from '../../utils/colorSchemes'
import { CSSProperties } from 'react'

const FlexDiv = styled.div`
  display: flex;
`

const FlexDivCol = styled(FlexDiv)`
  flex-direction: column;
`

type Props = {
  children: React.ReactNode
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  wrap?: React.CSSProperties['flexWrap']
  gap?: React.CSSProperties['gap']
} & React.ComponentProps<'div'>

export function FlexRow({
  children,
  align,
  justify,
  wrap,
  gap = 8,
  style,
  ...props
}: Props) {
  return (
    <FlexDiv
      style={{
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        gap: `${gap}px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </FlexDiv>
  )
}

export function FlexColumn({
  children,
  align,
  justify,
  wrap,
  gap,
  ...props
}: Props) {
  return (
    <FlexDivCol
      style={{
        alignContent: align,
        justifyItems: justify,
        flexWrap: wrap,
        gap: `${gap}px`,
      }}
      {...props}
    >
      {children}
    </FlexDivCol>
  )
}

export function Separator({
  color = Color.bg1,
  type = 'solid',
  margin = 8,
}: {
  color?: string
  type?: CSSProperties['borderStyle']
  margin?: number
}) {
  return (
    <div
      style={{
        height: '0px',
        width: '100%',
        borderBottom: `1px ${type} ${color}`,
        margin: `${margin}px 0`,
      }}
    />
  )
}
