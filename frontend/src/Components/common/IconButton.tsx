import { Color } from '../../utils/colorSchemes'
import {
  BsFillPencilFill,
  BsCheck,
  BsThreeDotsVertical,
  BsPlusCircle,
  BsXCircle,
} from 'react-icons/bs'
import { AiOutlineSave } from 'react-icons/ai'
import { Size } from '../../utils/types'
import { getSize } from './utils'

const icons = {
  pen: BsFillPencilFill,
  check: BsCheck,
  menu: BsThreeDotsVertical,
  plus: BsPlusCircle,
  cancel: BsXCircle,
  save: AiOutlineSave,
}

export type TIcon = keyof typeof icons

export function Icon({
  type,
  color = Color.fg1,
}: {
  type: TIcon
  color?: string
}) {
  const Component = icons[type]
  return <Component color={color} />
}

export function IconButton({
  onClick,
  icon,
  size = 'S',
  style,
}: {
  onClick: () => void
  icon: TIcon
  size?: Size
  style?: React.CSSProperties
}) {
  const Component = icons[icon]
  const sizeVal = getSize(size)

  const baseOnClick = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <div
      onClick={baseOnClick}
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        marginLeft: '8px',
        width: '16px',
        ...style,
      }}
    >
      <Component
        color={Color.fg1}
        style={{ height: sizeVal, width: sizeVal }}
      />
    </div>
  )
}
