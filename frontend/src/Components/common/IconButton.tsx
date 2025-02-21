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
import { useState } from 'react'

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
  innerRef,
}: {
  onClick: () => void
  icon: TIcon
  size?: Size
  style?: React.CSSProperties
  innerRef?: React.RefObject<HTMLDivElement | null>
}) {
  const [isHovered, setIsHovered] = useState(false)
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
        margin: 'auto',
        ...style,
      }}
      ref={innerRef}
    >
      <Component
        color={isHovered ? Color.darken(Color.fg1, 5) : Color.fg1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ height: sizeVal, width: sizeVal, cursor: 'pointer' }}
      />
    </div>
  )
}
