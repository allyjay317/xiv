import penButton from '../../assets/img/edit-pen-icon.svg'
import {ReactSVG} from 'react-svg'
import { Color } from '../../utils/colorSchemes'


export function PenButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        height: '16px',
        marginLeft: '8px',
        width: '16px',
      }}
    >
      <ReactSVG src={penButton} style={{
        'fill': Color.fg1
      }}  />
    </div>
  )
}
