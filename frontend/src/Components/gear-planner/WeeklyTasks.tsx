import { useState } from 'react'
import { Card } from '../common/Card'
import { Task } from './Task'

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

export function WeeklyTasks() {
  const [tasks, setTasks] = useState(defaultTasks)

  const onTaskChange = (id: number, isChecked: boolean) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, value: isChecked } : t)))
  }

  return (
    <Card title="Weekly Tasks">
      {tasks.map((t) => (
        <div style={{ margin: '4px auto' }}>
          <Task task={t} onChange={onTaskChange} />
        </div>
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
  )
}
