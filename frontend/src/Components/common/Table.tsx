import { useMemo, useState } from 'react'

import { Type } from './Type'
import styled from '@emotion/styled'
import { Color } from '../../utils/colorSchemes'
import { Button } from './Button'
import { Size } from '../../utils/types'

const Column = styled.td`
  border: 1px solid ${Color.fg1};
  width: 100px;
  text-align: center;
`

type TColType = 'string' | 'number' | 'boolean' | 'date' | 'object' | 'name'

type TCol<T> = {
  key: keyof T
  label: string
  type?: TColType
}

const TableElement = ({
  children,
  i,
}: {
  children: React.ReactNode
  i: number
}) => {
  return i === 0 ? <thead>{children}</thead> : <tbody>{children}</tbody>
}

export function Table<T>({
  columns,
  rows,
  title,
  size = 'XS',
  pivot: iPivot = false,
  allowPivot,
}: {
  columns: Array<TCol<T>>
  title?: string
  rows: T[]
  size?: Size
  pivot?: boolean
  allowPivot?: boolean
}) {
  const [pivot, setPivot] = useState(iPivot)

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Type bold size="M" style={{ flexGrow: 2 }}>
          {title}
        </Type>
        {allowPivot && (
          <Button label="Pivot" onClick={() => setPivot(!pivot)} />
        )}
      </div>
      <table style={{ width: '100%' }}>
        {pivot ? (
          <>
            {columns.map((c, i) => {
              return (
                <TableElement i={i} key={String(c.key)}>
                  <tr>
                    {i !== 0 ? (
                      <Cell
                        key={c.label}
                        value={c.label}
                        size={size}
                        type={c.type === 'name' ? c.type : 'string'}
                      />
                    ) : (
                      <th />
                    )}
                    {rows.map((r) => {
                      const h = r[columns[i].key]
                      return i === 0 ? (
                        <Cell
                          key={`${String(c.key)} - ${h} - ${c.label}`}
                          type={c.type === 'name' ? c.type : 'string'}
                          value={h}
                          size={size}
                          header
                        />
                      ) : (
                        <Cell
                          key={`${String(c.key)} - ${h} - ${c.label}`}
                          size={size}
                          value={h}
                          type={columns[i].type}
                        />
                      )
                    })}
                  </tr>
                </TableElement>
              )
            })}
          </>
        ) : (
          <>
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)}>
                  <Type bold size={size}>
                    {column.label}
                  </Type>
                </th>
              ))}
            </tr>
            {rows.map((row, i) => (
              <Row key={`row- ${i}`} columns={columns} row={row} size={size} />
            ))}
          </>
        )}
      </table>
    </>
  )
}

type DefaultCellProps = {
  key: string
  size: Size
  header?: boolean
}

function Wrapper({
  header,
  children,
}: {
  header: boolean
  children: React.ReactNode
}) {
  return header ? <th>{children}</th> : <Column>{children}</Column>
}

function BooleanCell({
  key,
  size,
  value,
  header = false,
}: DefaultCellProps & { value: boolean }) {
  return (
    <Wrapper header={header} key={key}>
      <Type size={size}>{value ? 'TRUE' : 'FALSE'}</Type>
    </Wrapper>
  )
}

function NumberCell({
  key,
  size,
  value,
  header = false,
}: DefaultCellProps & { value: number }) {
  return (
    <Wrapper header={header} key={key}>
      <Type size={size}>{String(value)}</Type>
    </Wrapper>
  )
}

function StringCell({
  key,
  size,
  value,
  header = false,
}: DefaultCellProps & { value: string }) {
  return (
    <Wrapper header={header} key={key}>
      <Type size={size}>{value}</Type>
    </Wrapper>
  )
}

function NameCell({ value, ...props }: DefaultCellProps & { value: string }) {
  const name = value.split(' ')
  return <StringCell {...props} value={`${name[0]} ${name[1][0]}.`} />
}

function DateCell({
  key,
  size,
  value,
  header = false,
}: DefaultCellProps & { value: Date }) {
  return (
    <Wrapper header={header} key={key}>
      <Type size={size}>{(value as Date).toISOString()}</Type>
    </Wrapper>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ObjectCell({
  key,
  size,
  value,
  header = false,
}: DefaultCellProps & { value: Record<string, any> }) {
  return (
    <Wrapper header={header} key={key}>
      <Type size={size} style={{ whiteSpace: 'pre-line' }}>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </Type>
    </Wrapper>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Cell({
  type = 'string',
  value,
  ...props
}: DefaultCellProps & { value: any; type?: TColType }) {
  switch (type) {
    case 'boolean':
      return <BooleanCell {...props} value={value as boolean} />
    case 'number':
      return <NumberCell {...props} value={value as number} />
    case 'name':
      return <NameCell {...props} value={value as string} />
    case 'string':
      return <StringCell {...props} value={value as string} />
    case 'date':
      return <DateCell {...props} value={value as Date} />
    case 'object':
      return <ObjectCell {...props} value={value as Record<string, any>} />
  }
}

function Row<T>({
  columns,
  row,
  size,
}: {
  row: T
  columns: TCol<T>[]
  size: Size
}) {
  const renderCells = useMemo(() => {
    const cells = []
    for (const column of columns) {
      cells.push(
        <Cell
          key={String(column)}
          size={size}
          value={row[column.key]}
          type={column.type}
        />,
      )
    }

    return cells
  }, [columns, row])
  return <tr>{renderCells.map((cell) => cell)}</tr>
}
