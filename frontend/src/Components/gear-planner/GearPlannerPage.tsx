import { useMemo } from 'react'
import { Type } from '../common/Type'
import { useSiteContext } from '../context/useSiteContext'
import { WeeklyTasks } from './WeeklyTasks'
import { FlexColumn, FlexRow } from '../common/Layout'
import { Card } from '../common/Card'
import { Button } from '../common/Button'
import { Color } from '../../utils/colorSchemes'
import { Task } from './Task'

export function GearPlannerPage() {
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

  return (
    <FlexColumn
      gap="16"
      style={{ position: 'relative' }}
      justify="center"
      align="center"
    >
      <Card title="Currencies">
        <FlexRow justify="center" align="center">
          <Card title="Tomes">
            <Type size="S">
              <Type size="S">Total: 1500</Type>
            </Type>
          </Card>
          <Card title="Floor 1 Books" style={{ height: '100%' }}>
            <Type size="S">1</Type>
          </Card>
          <Card title="Floor 2 Books">
            <Type size="S">2</Type>
          </Card>
          <Card title="Floor 3 Books">
            <Type size="S">3</Type>
          </Card>
          <Card title="Floor 4 Books">
            <Type size="S">4</Type>
          </Card>
        </FlexRow>
      </Card>
      <FlexRow align="center">
        <Button label="<" />
        <Type
          size="M"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 999,
            backgroundColor: Color.ui,
          }}
        >
          Week of {lastTuesday.toLocaleDateString()}
        </Type>
        <Button label=">" style={{ visibility: 'hidden' }} />
      </FlexRow>

      {displayedCharacter && (
        <FlexRow justify="center" style={{ width: '100%' }}>
          <WeeklyTasks />
          <WeeklyTasks />
          <Card title="Looking Forward" width="25%">
            <Task
              task={{
                label: '3/25',
                type: 'display',
                editable: false,
                id: 0,
                value: 'Buy Tome Pants',
              }}
            />
            <Task
              task={{
                label: '4/01',
                type: 'display',
                editable: false,
                id: 0,
                value: 'Buy Tome Head',
              }}
            />
            <Task
              task={{
                label: '4/01',
                type: 'display',
                editable: false,
                id: 0,
                value: 'Buy Raid Hands',
              }}
            />
          </Card>
        </FlexRow>
      )}
    </FlexColumn>
  )
}
