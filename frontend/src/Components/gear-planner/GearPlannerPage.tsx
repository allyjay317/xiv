import { useMemo, useState } from 'react'
import { Type } from '../common/Type'
import { Card } from '../common/Card'
import { Task } from './Task'
import { useSiteContext } from '../context/useSiteContext'
import { GearSetHeader } from '../GearSet/GearSetHeader'
import { Slot } from '../../utils/types'
import { SLOT_INFO } from '../../utils/constants'

const defaultTasks = [
  {
    label: 'Clear floor 1',
    value: false,
    type: 'bool',
    id: 0,
  },
  {
    label: 'Clear floor 2',
    value: false,
    type: 'bool',
    id: 1,
  },
  {
    label: 'Clear floor 3',
    value: false,
    type: 'bool',
    id: 2,
  },
  {
    label: 'Clear floor 4',
    value: false,
    type: 'bool',
    id: 3,
  },
  {
    label: 'Cap Tomes',
    value: false,
    type: 'bool',
    id: 4,
  },
]

export function GearPlannerPage() {
  const [tasks, setTasks] = useState(defaultTasks)
  const { characters, selectedCharacter } = useSiteContext()

  const lastTuesday = useMemo(() => {
    const today = new Date(Date.now())
    const dotw = today.getDay()
    const gap = dotw < 2 ? 6 + dotw : dotw - 2
    today.setDate(today.getDate() - gap)

    return today
  }, [])

  const displayedCharacter = useMemo(
    () => (selectedCharacter ? characters[selectedCharacter] : undefined),
    [selectedCharacter],
  )

  const onTaskChange = (id: number, isChecked: boolean) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, value: isChecked } : t)))
  }

  const priorityItems = useMemo(() => {
    const newSI = { ...SLOT_INFO, [Slot.RING2]: undefined }
    return Object.values(newSI).filter(
      (si) => si && si?.bookCost !== 0 && si.tomeCost !== 0,
    )
  }, [])

  return (
    <>
      <Type size="M">Week of {lastTuesday.toLocaleDateString()}</Type>
      <div style={{ display: 'flex', gap: '16px' }}>
        {displayedCharacter && (
          <>
            <Card title="Weekly Tasks">
              {tasks.map((t) => (
                <Task task={t} onChange={onTaskChange} />
              ))}
              <Card title="Buy Raid Gear">
                <Task
                  task={{
                    label: 'Buy Healer Pants (Raid)',
                    type: 'bool',
                  }}
                  onChange={() => {}}
                />
              </Card>
              <Card title="Buy Tome Gear">
                <Task
                  task={{
                    label: 'Buy Healer Body (Tome)',
                    type: 'bool',
                  }}
                  onChange={() => {}}
                />
              </Card>
            </Card>
            <Card title="Gear Set Priority">
              {displayedCharacter.gearSets.map((gs) => (
                <Card>
                  <GearSetHeader gearSet={gs} compact editable={false} />
                  <div style={{ display: 'flex', gap: 4 }}>
                    <Type size="XS">Raid: 0</Type>
                    <Type size="XS">Tome: 0</Type>
                    <Type size="XS">Twine: 0</Type>
                    <Type size="XS">Brine: 0</Type>
                  </div>
                </Card>
              ))}
            </Card>
            <Card title="Gear Priority">
              {priorityItems.map((s) => {
                return (
                  <Card>
                    <Type size="S">{s?.name}</Type>
                  </Card>
                )
              })}
            </Card>
          </>
        )}
      </div>
    </>
  )
}
