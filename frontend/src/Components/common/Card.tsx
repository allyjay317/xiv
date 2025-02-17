import { Color } from '../../utils/colorSchemes'
import { Type } from './Type'
import { Draggable } from '@hello-pangea/dnd'
import styled from '@emotion/styled'
import { Button } from './Button'
import { Separator } from './Layout'

type Action = {
  label: string
  onClick: VoidFunction
}

type CardProps = {
  children: React.ReactNode
  title?: string
  style?: React.CSSProperties
  actions?: Action[]
  width?: string
}

export function Card({
  children,
  title,
  style,
  actions = [],
  width,
}: CardProps) {
  return (
    <div
      style={{
        backgroundColor: Color.bg2,
        // display: ref ? 'default' : 'flex',
        flexDirection: 'column',
        filter: `drop-shadow(3px 3px ${Color.bg1})`,
        position: 'relative',
        padding: '16px',
        maxHeight: 'fit-content',
        gap: 4,
        border: `1px solid ${Color.bg1}`,
        width,
        ...style,
      }}
    >
      <div style={{ display: 'flex' }}>
        {title && (
          <Type size="M" style={{ flexGrow: 2 }}>
            {title}
          </Type>
        )}

        {actions.map((action) => (
          <Button label={action.label} onClick={action.onClick} />
        ))}
      </div>
      {(title || actions.length > 0) && <Separator />}
      {children}
    </div>
  )
}

const Container = styled.div`
  background-color: ${Color.bg2};
  display: flex;
  flex-direction: column;
  filter: drop-shadow(3px 3px ${Color.bg1});
  padding: 16px;
  max-height: fit-content;
  gap: 4px;
  border: 1px solid ${Color.bg1};
  top: auto !important;
  left: auto !important;
`

export function DragableCard({
  id,
  index,
  title,
  children,
  actions = [],
}: CardProps & { id: string; index: number }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            {title && <Type size="M">{title}</Type>}
            {actions.map((action) => (
              <Button label={action.label} onClick={action.onClick} />
            ))}
          </div>
          {children}
        </Container>
      )}
    </Draggable>
  )
}
