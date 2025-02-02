import styled from '@emotion/styled'
import { Color } from '../../utils/colorSchemes'



export function Button({
  label,
  onClick,
  style,
  state,
  width = 'fit-content',
}: {
  label: string
  onClick?: () => void
  style?: React.CSSProperties
  state?: 'default' | 'disabled'
  width?: string
}) {

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
  width: ${width};
  max-width: 200px;
  color: ${Color.fg1};
  ${state === 'disabled' ? "" : `&:hover {
    filter: drop-shadow(15px 10px 4px rgba(0, 0, 0, 0.25));
    background-color: ${Color.bg2};
    left: 5px';
    top: 5px;
  }`}
`

  return (
    <ButtonContainer onClick={onClick} style={{...style, color: state === 'disabled' ? Color.bg3 : style?.color ?? Color.fg1, cursor: state === 'disabled' ? 'default' : 'pointer'}}>
      {label}
    </ButtonContainer>
  )
}
