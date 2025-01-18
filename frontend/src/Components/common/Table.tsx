import { useMemo } from 'react'

import { Type } from './Type'

type TCol<T> = {
  key: keyof T
  label: string
  type?: 'string' | 'number' | 'boolean' | 'date' | 'object'
}

export function Table<T>({
  columns,
  rows,
  title,
}: {
  columns: Array<TCol<T>>
  title: string
  rows: T[]
}) {
  return (
    <>
      <Type bold size="M">
        {title}
      </Type>
      <table>
        <tr>
          {columns.map(column => (
            <th key={String(column.key)}>
              <Type bold size="XS">
                {column.label}
              </Type>
            </th>
          ))}
        </tr>
        {rows.map(row => (
          <Row key={String(row)} columns={columns} row={row} />
        ))}
      </table>
    </>
  )
}

function Row<T>({ columns, row }: { row: T; columns: TCol<T>[] }) {
  const renderCells = useMemo(() => {
    const cells = []
    for (const column of columns) {
      switch (column.type) {
        case 'boolean':
          cells.push(
            <td key={String(column)}>
              <Type size="XS">{row[column.key] ? 'TRUE' : 'FALSE'}</Type>
            </td>
          )
          break
        case 'number':
          cells.push(
            <td key={String(column)}>
              <Type size="XS">{String(row[column.key])}</Type>
            </td>
          )
          break
        case 'string':
          cells.push(
            <td key={String(column)}>
              <Type size="XS">{row[column.key] as string}</Type>
            </td>
          )
          break
        case 'date':
          cells.push(
            <td key={String(column)}>
              <Type size="XS">{(row[column.key] as Date).toISOString()}</Type>
            </td>
          )
          break
        case 'object':
          cells.push(
            <td key={String(column)}>
              <Type size="XS" style={{ whiteSpace: 'pre-line' }}>
                <pre>
                  {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  JSON.stringify(row[column.key] as Record<string, any>, null, 2)
                  }
                </pre>
              </Type>
            </td>
          )
          break
      }
    }

    return cells
  }, [columns, row])
  return <tr>{renderCells.map(cell => cell)}</tr>
}
