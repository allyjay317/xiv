
import { Color } from '../../utils/colorSchemes'
import {BsFillPencilFill, BsCheck, BsThreeDotsVertical, BsPlusCircle, BsXCircle} from 'react-icons/bs'

const icons = {
  'pen': BsFillPencilFill,
  'check': BsCheck,
  'menu': BsThreeDotsVertical,
  'plus': BsPlusCircle,
  'cancel': BsXCircle
}

export type Icon = keyof typeof icons


export function IconButton({ onClick, icon }: { onClick: () => void, icon: Icon }) {
  const Component = icons[icon]
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
      <Component color={Color.fg1} />
    </div>
  )
}
