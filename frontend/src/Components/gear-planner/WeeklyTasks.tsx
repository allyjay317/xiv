import { useState } from 'react'
import { Card } from '../common/Card'
import { Task, TTask } from './Task'

const defaultTasks: TTask[] = [
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

  function onTaskChange<T>(id: string | number, value: T) {
    const newTasks: TTask[] = tasks.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          value,
        } as TTask
      }
      return t
    })
    setTasks(newTasks)
  }

  return (
    <Card title="Weekly Tasks" width="25%">
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

            id: 'r1',
            value: false,
          }}
          onChange={() => {}}
        />
      </Card>
      <Card title="Buy Tome Gear">
        <Task
          task={{
            label: 'Buy Healer Pants (Raid)',
            type: 'bool',

            id: 'r1',
            value: false,
          }}
          onChange={() => {}}
        />
      </Card>
    </Card>
  )
}
