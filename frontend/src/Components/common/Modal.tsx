import styled from '@emotion/styled'
import { useEffect } from 'react'
import { Color } from '../../utils/colorSchemes'
import { Action } from './Card'
import { Type } from './Type'

const ModalBackground = styled.div<{ open?: boolean }>`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  z-index: 999999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`

const ModalContainer = styled.div`
  background-color: ${Color.ui};
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding: 20px;
  border: 1px solid ${Color.fg1};
  width: fit-content;
  border-radius: 15px;
  position: absolute;
`

const ModalHeader = styled.div`
  display: flex;
  margin-bottom: 32px;
  border-bottom: 1px solid ${Color.fg1};
  text-align: center;
  padding-bottom: 8px;
  width: 100%;
  justify-content: center;
`

export function Modal({
  open,
  onClose,
  children,
  title,
  actions,
}: {
  open: boolean
  onClose: VoidFunction
  children: React.ReactNode
  title?: string
  actions?: Action
}) {
  useEffect(() => {
    function closeListener(e: MouseEvent) {
      if (
        e.target instanceof HTMLDivElement &&
        (e.target as HTMLDivElement).classList.contains('modal-background')
      ) {
        onClose()
      }
    }
    window.addEventListener('click', closeListener)

    return () => window.removeEventListener('click', closeListener)
  })

  return (
    <ModalBackground className="modal-background" open={open}>
      <ModalContainer>
        {(title || actions) && (
          <ModalHeader>
            <Type size="L">{title}</Type>
          </ModalHeader>
        )}
        {children}
      </ModalContainer>
    </ModalBackground>
  )
}
