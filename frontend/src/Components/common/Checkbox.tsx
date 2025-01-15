import styled from '@emotion/styled'
import { Color } from '../../utils/colorSchemes'


const Checkmark = styled.input`
 
  appearance: none;
  margin: 0;

  font: inherit;
  color: ${Color.fg1};
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid ${Color.fg1};
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  cursor: pointer;
  display: grid;
  place-content: center;
  &:before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em ${Color.fg1};
    /* Windows High Contrast Mode */
    background-color: ${Color.bg1};
  }
  &:checked {
    &:before {
      transform: scale(1);
    }
  }
  &:focus {
    outline: max(1px, 0.075em) solid ${Color.fg1};
    outline-offset: max(1px, 0.075em);
  }
  &:disabled {
    --form-control-color: var(--form-control-disabled);

    color: var(--form-control-disabled);
    cursor: not-allowed;
  }
`

export function Checkbox({
  label,
  onChange,
  style,
  value,
}: {
  label: string
  value: boolean
  onChange: (isChecked: boolean) => void
  style?: React.CSSProperties
}) {
  return (
    <span
      style={{
        alignItems: 'center',
        color: Color.fg1,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {label}
      <span style={{ marginTop: '4px' }}>
        <Checkmark
          checked={value}
          onChange={e => onChange(e.target.checked)}
          type="checkbox"
        />
      </span>
    </span>
  )
}
