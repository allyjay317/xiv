import { useMemo } from 'react'
import { Table } from '../common/Table'
import { useSiteContext } from '../context/useSiteContext'
import { UpgradeItem } from '../../utils/types'
import { getStats } from '../../utils/utils'
import { SLOT_INFO } from '../../utils/constants'

type RemainingRow = {
  name: string
  tomes: number
  floor_1: number
  floor_2: number
  floor_3: number
  floor_4: number
  shine: number
  twine: number
}

export function RemainingCostsTable() {
  const { characters } = useSiteContext()

  const rows = useMemo(() => {
    const rows: RemainingRow[] = []
    Object.keys(characters).forEach((cID) => {
      const character = characters[cID]

      const row = {
        name: character.info.name,
        tomes: 0,
        floor_1: 0,
        floor_2: 0,
        floor_3: 0,
        floor_4: 0,
        shine: 0,
        twine: 0,
      }
      const stats = getStats(character.gearSets)
      stats.floor1.forEach((i) => {
        const info = SLOT_INFO[i.slot]
        row.floor_1 += i.raid * info.bookCost
        row.tomes += i.tomestone * info.tomeCost
      })
      stats.floor2.forEach((i) => {
        if (i.slot === UpgradeItem.SHINE) {
          row.shine += i.raid
        } else {
          const info = SLOT_INFO[i.slot]
          row.floor_2 += i.raid * info.bookCost
          row.tomes += i.tomestone * info.tomeCost
        }
      })
      stats.floor3.forEach((i) => {
        if (i.slot === UpgradeItem.TWINE) {
          row.twine += i.raid
        } else {
          const info = SLOT_INFO[i.slot]
          row.floor_3 += i.raid * info.bookCost
          row.tomes += i.tomestone * info.tomeCost
        }
      })
      stats.floor4.forEach((i) => {
        const info = SLOT_INFO[i.slot]
        row.floor_4 += i.raid * info.bookCost
        row.tomes += i.tomestone * info.tomeCost
      })
      rows.push(row)
    })
    return rows
  }, [characters])

  return (
    <div style={{ width: '500px' }}>
      <Table
        columns={[
          {
            key: 'name',
            label: 'Character',
            type: 'name',
          },
          {
            key: 'tomes',
            label: 'Tomes',
            type: 'number',
          },
          {
            key: 'floor_1',
            label: 'Floor 1 Books',
            type: 'number',
          },
          {
            key: 'floor_2',
            label: 'Floor 2 Books',
            type: 'number',
          },
          {
            key: 'floor_3',
            label: 'Floor 3 Books',
            type: 'number',
          },
          {
            key: 'floor_4',
            label: 'Floor 4 Books',
            type: 'number',
          },
          {
            key: 'shine',
            label: 'Shine',
            type: 'number',
          },
          {
            key: 'twine',
            label: 'Twine',
            type: 'number',
          },
        ]}
        rows={rows}
        title="Remaining Costs"
        size="S"
        pivot
      />
    </div>
  )
}
