import { useMemo } from 'react'
import { Type } from '../../common/Type'
import { Table } from './Table'
import { getStats } from '../../../utils/utils'
import { useSiteContext } from '../../context/useSiteContext'

export function Stats() {
  const { characters, selectedCharacter } = useSiteContext()

  const gearSets = useMemo(() => {
    if (!selectedCharacter) return []
    return characters[selectedCharacter]?.gearSets
  }, [characters, selectedCharacter])

  const tableData = useMemo(() => {
    return getStats(gearSets)
  }, [gearSets])
  return (
    <div>
      <Type bold size="L">
        Remaining
      </Type>
      <div
        style={{
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Table rows={tableData.floor1} title="Floor 1" />
        <Table rows={tableData.floor2} title="Floor 2" />
        <Table rows={tableData.floor3} title="Floor 3" />
        <Table rows={tableData.floor4} title="Floor 4" />
      </div>
    </div>
  )
}
