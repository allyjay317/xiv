import { useMemo } from 'react'
import { Slot, UpgradeItem } from '../../../utils/types'
import { Type } from '../../common/Type'
import { SLOT_INFO } from '../../../utils/constants'


type Row = {
  slot: Slot | UpgradeItem
  raid: number
  tomestone: number
}

export function Table({ rows, title }: { title: string; rows: Row[] }) {
  const rowDisplay = useMemo(() => {
    return rows.map(row => {
      if (row.raid === 0 && row.tomestone === 0) {
        return null
      }
      return (
        <tr key={row.slot}>
          <td>
            <Type size="XS">{SLOT_INFO[row.slot].name}</Type>
          </td>
          <td>
            <Type size="XS">{row.raid}</Type>
          </td>
          <td>
            <Type size="XS">{row.tomestone}</Type>
          </td>
        </tr>
      )
    })
  }, [rows])

  const hasRows = useMemo(() => {
    return (
      rowDisplay.filter(rd => {
        return rd !== null
      }).length > 0
    )
  }, [rowDisplay])

  return hasRows ? (
    <>
      <Type bold size="M">
        {title}
      </Type>
      <table>
        <tr>
          <th style={{ width: '100px' }}>
            <Type bold size="XS">
              Slot
            </Type>
          </th>
          <th>
            <Type bold size="XS">
              Raid
            </Type>
          </th>
          <th>
            <Type bold size="XS">
              Tomestone
            </Type>
          </th>
        </tr>
        {rowDisplay}
      </table>
    </>
  ) : null
}
