import styled from '@emotion/styled'
import { Color } from '../../utils/colorSchemes'
import { useMemo, useState } from 'react'
import { Button } from './Button'



export function MenuButton({
  label,
  style,
  state,
  menuItems,
  direction = 'up',
  width = '100px',
  menuWidth = '100px'
}: {
  label: string
  onClick?: () => void
  style?: React.CSSProperties
  state?: 'default' | 'disabled'
  menuItems: Array<{
    label: string | React.ReactNode,
    onClick: VoidFunction
  }>
  direction?: 'up' | 'down' | 'left' | 'right'
  width?: string
  menuWidth?: string
}) {

    const [isOpen, setIsOpen] = useState(false)

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

    const menuStyles: React.CSSProperties = useMemo(() => {
        switch(direction){
            case 'down':
                return {
                    top: 48,
                }
            case 'left':
                return {
                    left: `-${menuWidth}`,
                    top: 0,
                }
            case 'right':
                return {
                    right: `-${menuWidth}`,
                    top: 0
                }
            case 'up':
                return {
                    top: -48 * menuItems.length,
                    flexDirection: 'column-reverse'
                }
        }
    }, [direction])

  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
    <ButtonContainer onClick={() => setIsOpen(!isOpen)} style={{...style, color: state === 'disabled' ? Color.bg3 : style?.color ?? Color.fg1, cursor: state === 'disabled' ? 'default' : 'pointer'}}>
      {label}
      
    </ButtonContainer>
    {isOpen && (
        <>
        <div style={{position: 'absolute', backgroundColor: 'white', width: menuWidth, zIndex: '200', display: 'flex', flexDirection: 'column', ...menuStyles}} color='white'>
            {menuItems.map(mi => {
                if(typeof mi.label === 'string'){
                    return <Button label={mi.label} onClick={mi.onClick} width={menuWidth} />
                } else {
                    return <div onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        mi.onClick()
                    }
                    }>{mi.label}</div>
                }
            })}
        </div>
        </>
      )}
    </div>
  )
}
