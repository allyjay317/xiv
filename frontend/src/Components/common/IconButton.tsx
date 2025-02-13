import { Color } from '../../utils/colorSchemes'
import {
  BsFillPencilFill,
  BsCheck,
  BsThreeDotsVertical,
  BsPlusCircle,
  BsXCircle,
} from 'react-icons/bs'
import { Size } from '../../utils/types'
import { getSize } from './utils'

const icons = {
  pen: BsFillPencilFill,
  check: BsCheck,
  menu: BsThreeDotsVertical,
  plus: BsPlusCircle,
  cancel: BsXCircle,
}

export type Icon = keyof typeof icons

export function IconButton({
  onClick,
  icon,
  size = 'S',
}: {
  onClick: () => void
  icon: Icon
  size?: Size
}) {
  const Component = icons[icon]
  const sizeVal = getSize(size)
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
      <Component
        color={Color.fg1}
        style={{ height: sizeVal, width: sizeVal }}
      />
    </div>
  )
}
