import styled from '@emotion/styled'
import { Color } from '../../utils/colorSchemes'

const ButtonContainer = styled.div`
    background-color: ${Color.bg1};
    border: 1px solid ${Color.fg1};
    border-radius: 4px;
    cursor: pointer;
    filter: drop-shadow(7px 5px 4px rgba(0, 0, 0, 0.25));
    padding: 12px 10px;
    text-align: center;
    box-sizing: border-box;
    transition: 120ms filter ease-in-out;
    width: fit-content;
    max-width: 200px;
    color: ${Color.fg1};
    &:hover {
      filter: drop-shadow(15px 10px 4px rgba(0, 0, 0, 0.25));
      background-color: ${Color.bg2};
      left: 5px';
      top: 5px;
    }
`

export function Button({
  label,
  onClick,
  style,
}: {
  label: string
  onClick?: () => void
  style?: React.CSSProperties
}) {
  return (
    <ButtonContainer onClick={onClick} style={style}>
      {label}
    </ButtonContainer>
  )
}
