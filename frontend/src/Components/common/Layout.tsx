import styled from '@emotion/styled'

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
