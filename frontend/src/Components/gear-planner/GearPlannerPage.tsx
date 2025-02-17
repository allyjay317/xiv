import { useEffect, useMemo, useState } from 'react'
import { Type } from '../common/Type'
import { useSiteContext } from '../context/useSiteContext'
import { GearSetPriority } from './GearSetPriority'
import { WeeklyTasks } from './WeeklyTasks'
import { PriorityItems } from './PriorityItems'
import { FlexColumn, FlexRow } from '../common/Layout'
import { Card } from '../common/Card'
import { Button } from '../common/Button'
import { Color } from '../../utils/colorSchemes'
import { GearSet } from '../../utils/types'

export function GearPlannerPage() {
  const { characters, selectedCharacter } = useSiteContext()
  const [priorityOpen, setPriorityOpen] = useState<null | GearSet>(null)

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

  useEffect(() => {
    console.log(priorityOpen)
  }, [priorityOpen])

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
        <>
          <FlexRow
            gap="16"
            justify="center"
            style={{ position: 'relative', width: 'min-content' }}
          >
            <WeeklyTasks />
            <GearSetPriority
              gearSets={displayedCharacter.gearSets}
              onOpenPriority={(gs: GearSet) => {
                if (priorityOpen?.id === gs.id) {
                  setPriorityOpen(null)
                } else {
                  setPriorityOpen(gs)
                }
              }}
            />
            <div
              style={{
                visibility: priorityOpen !== null ? 'visible' : 'hidden',
                position: 'absolute',
                right: -300,
              }}
            >
              <PriorityItems
                onClose={() => setPriorityOpen(null)}
                gearSet={priorityOpen}
              />
            </div>
          </FlexRow>
        </>
      )}
    </FlexColumn>
  )
}
