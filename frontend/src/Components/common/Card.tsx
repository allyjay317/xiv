import { Color } from '../../utils/colorSchemes'
import { Type } from './Type'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd'
import styled from '@emotion/styled'
import { Button } from './Button'
import { Separator } from './Layout'
import { JSX } from 'react'

export type Action = {
  label: string
  onClick: VoidFunction
}

type CardProps = {
  children: React.ReactNode
  title?: string
  style?: React.CSSProperties
  actions?: Action[]
  width?: string
  color?: string
}

export function Card({
  children,
  title,
  style,
  color = Color.bg2,
  actions = [],
  width,
}: CardProps) {
  return (
    <div
      style={{
        backgroundColor: color,
        // display: ref ? 'default' : 'flex',
        flexDirection: 'column',
        filter: `drop-shadow(3px 3px ${Color.bg1})`,
        position: 'relative',
        padding: '16px',
        maxHeight: 'fit-content',
        minWidth: actions.length ? `${150 + actions.length * 50}px` : undefined,
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
          <Button
            key={`action-${action.label}`}
            label={action.label}
            onClick={action.onClick}
          />
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

interface Identifyable {
  id: string
}

export function DragAndDropCard<T extends Identifyable>({
  items,
  setItems,
  id,
  Component,
  ...cardProps
}: {
  items: T[]
  setItems: (value: T[]) => void
  id: string
  Component: ({ item }: { item: T }) => JSX.Element
} & Omit<CardProps, 'children'>) {
  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return
    if (destination.index === source.index) {
      return
    }
    const movedItems = items.find((s) => s.id === draggableId)
    if (!movedItems) return

    const newItems = [...items]
    newItems.splice(source.index, 1)
    newItems.splice(destination.index, 0, movedItems)
    setItems(newItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card {...cardProps}>
        <Droppable droppableId={id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((s, index) => {
                return (
                  <DragableCard id={s.id} key={s.id} index={index}>
                    <Component item={s} />
                  </DragableCard>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </DragDropContext>
  )
}
