import { useMemo } from 'react'
import { Type } from '../common/Type'
import { useSiteContext } from '../context/useSiteContext'
import { GearSetPriority } from './GearSetPriority'
import { WeeklyTasks } from './WeeklyTasks'
import { PriorityItems } from './PriorityItems'

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
    <>
      <Type size="M">Week of {lastTuesday.toLocaleDateString()}</Type>
      <div style={{ display: 'flex', gap: '16px' }}>
        {displayedCharacter && (
          <>
            <WeeklyTasks />
            <GearSetPriority gearSets={displayedCharacter.gearSets} />
            <PriorityItems />
          </>
        )}
      </div>
    </>
  )
}
