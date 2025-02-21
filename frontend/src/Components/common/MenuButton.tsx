import React, { useMemo, useState } from 'react'
import { Button } from './Button'
import { ImgButton } from './ImgButton'
import { TIcon, IconButton } from './IconButton'
import { Size } from '../../utils/types'
import { Color } from '../../utils/colorSchemes'

type TButton = {
  type: 'button'
}

type TImgButton = {
  type: 'img'
  img: string
  color: string
}

type TIconButton = {
  type: 'icon'
  icon: TIcon
  color: string
}

type BaseMenuItem = {
  type: string
}

type TButtonMenuItem = BaseMenuItem & {
  type: 'button'
  label: string
  onClick: VoidFunction
}

type TSubMenuItem = BaseMenuItem & {
  type: 'menu'
  label: string
  menuItems: Array<TMenuItem>
}

export type TMenuItem = TButtonMenuItem | TSubMenuItem

type ButtonConfig = TButton | TImgButton | TIconButton

console.log(window.innerWidth)

export function MenuButton({
  label,
  style,
  state,
  menuItems,
  direction = 'up',
  width = '100px',
  menuWidth = '100px',
  config = { type: 'button' },
  hover,
  size = 'S',
}: {
  label: string
  style?: React.CSSProperties
  state?: 'default' | 'disabled'
  menuItems: Array<TMenuItem>
  direction?: 'up' | 'down' | 'left' | 'right'
  width?: string
  menuWidth?: string
  config?: ButtonConfig
  hover?: boolean
  size?: Size
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [buttonRef, setButtonRef] = useState<Element | null>(null)

  const menuStyles: React.CSSProperties = useMemo(() => {
    switch (direction) {
      case 'down':
        return {
          bottom: -48 * menuItems.length,
        }
      case 'left':
        return {
          left: `-${menuWidth}`,
          top: 0,
        }
      case 'right':
        return {
          right: `-${menuWidth}`,
          top: 0,
        }
      case 'up':
        return {
          top: -48 * menuItems.length,
          flexDirection: 'column-reverse',
        }
    }
  }, [direction])

  const Component = useMemo(() => {
    switch (config.type) {
      case 'button':
        return (
          <Button
            label={label}
            onClick={() => setIsOpen(!isOpen)}
            state={state}
            width={width}
            style={style}
            onMouseOver={hover ? () => setIsOpen(true) : undefined}
            //onMouseLeave={hover ? () => setIsOpen(false) : undefined}
          />
        )
      case 'img':
        return (
          <ImgButton
            label="User Menu"
            color={config.color}
            src={config.img}
            onClick={() => setIsOpen(!isOpen)}
            size={size}
          />
        )
      case 'icon':
        return (
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            icon={config.icon}
            size={size}
          />
        )
    }
  }, [config.type, isOpen, state, width, style, label, setIsOpen])

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
      }}
      onBlur={() => setIsOpen(false)}
      tabIndex={1}
    >
      {Component}
      {isOpen && (
        <>
          <div
            ref={setButtonRef}
            style={{
              position: 'absolute',
              backgroundColor: Color.fg1,
              width: menuWidth,
              zIndex: '200',
              display: 'flex',
              flexDirection: 'column',
              right:
                buttonRef &&
                buttonRef.getBoundingClientRect().right > window.innerWidth
                  ? 0
                  : undefined,
              left:
                buttonRef && buttonRef.getBoundingClientRect().left < 0
                  ? 0
                  : undefined,
              ...menuStyles,
            }}
            color="white"
          >
            {menuItems.map((mi) => {
              return <MenuItem {...mi} width={menuWidth} />
            })}
          </div>
        </>
      )}
    </div>
  )
}

function MenuItem({ type, width, ...props }: TMenuItem & { width: string }) {
  switch (type) {
    case 'button':
      return <Button {...props} width={width} />
    case 'menu':
      return <MenuButton {...(props as TSubMenuItem)} direction="right" hover />
  }
}
