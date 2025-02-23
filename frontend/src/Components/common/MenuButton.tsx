import React, { useEffect, useMemo, useState } from 'react'
import { Button } from './Button'
import { ImgButton } from './ImgButton'
import { TIcon, IconButton } from './IconButton'
import { Size } from '../../utils/types'
import { Color } from '../../utils/colorSchemes'
import styled from '@emotion/styled'

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

const MRoot = styled.div<{ width: string; isOpen: boolean }>`
  position: absolute;
  background-color: ${Color.fg1};
  width: ${(props) => props.width};
  z-index: 200;
  display: flex;
  flex-direction: column;
  ${(props) => (props.isOpen ? '' : 'visibility: hidden;')}
`

const MButton = styled.div<{
  hover: boolean
}>`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  ${(props) =>
    props.hover
      ? `&:hover ${MRoot} {
    visibility: visible;
  }`
      : ''};
`

export function MenuButton({
  label,
  style,
  state,
  menuItems,
  direction = 'up',
  width = '100px',
  menuWidth = '100px',
  config = { type: 'button' },
  hover = false,
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
  const [menuRef, setMenuRef] = useState<Element | null>(null)
  const [buttonRef, setButtonRef] = useState<Element | null>(null)

  const menuStyles: React.CSSProperties = useMemo(() => {
    const rect = menuRef ? menuRef.getBoundingClientRect() : undefined
    const offScreenRight =
      rect && rect.right > window.innerWidth ? 0 : undefined
    const offScreenLeft = rect && rect.left < 0 ? 0 : undefined

    const down: React.CSSProperties = {
      bottom: -48 * menuItems.length,
      right: offScreenRight,
      left: offScreenLeft,
    }
    const left: React.CSSProperties = {
      left: `-${menuWidth}`,
      top: 0,
    }
    const right: React.CSSProperties = {
      right: `-${menuWidth}`,
      top: 0,
    }

    const up: React.CSSProperties = {
      top: -48 * menuItems.length,
      flexDirection: 'column-reverse',
      right: offScreenRight,
      left: offScreenLeft,
    }

    switch (direction) {
      case 'down':
        return rect && rect.bottom > window.innerHeight ? up : down
      case 'left':
        return rect && rect.left < 0 ? right : left
      case 'right':
        return rect && rect.right > window.innerWidth ? left : right
      case 'up':
        return rect && rect.top < 0 ? down : up
    }
  }, [direction, menuRef])

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (e.target === buttonRef) return
      setIsOpen(false)
    }
    window.addEventListener('click', listener)
    return () => {
      window.removeEventListener('click', listener)
    }
  }, [buttonRef])

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
            innerRef={setButtonRef}
            // onMouseOver={hover ? () => setIsOpen(true) : undefined}
            // onMouseLeave={hover ? () => setIsOpen(false) : undefined}
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
            innerRef={setButtonRef}
          />
        )
      case 'icon':
        return (
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            icon={config.icon}
            size={size}
            innerRef={setButtonRef}
          />
        )
    }
  }, [config.type, isOpen, state, width, style, label, setIsOpen])

  return (
    <MButton
      // onBlur={() => {
      //   setIsOpen(false)
      // }}
      className="menu-button"
      tabIndex={1}
      hover={hover}
    >
      {Component}
      <>
        <MRoot
          width={menuWidth}
          ref={setMenuRef}
          style={menuStyles}
          isOpen={isOpen}
          className="menu"
        >
          {menuItems.map((mi) => {
            return (
              <div className="menu-item">
                <MenuItem {...mi} width={menuWidth} />
              </div>
            )
          })}
        </MRoot>
      </>
    </MButton>
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
