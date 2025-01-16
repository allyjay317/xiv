import { useState } from 'react'
import { useSiteContext } from '../context/SiteContext'
import { GearSet } from '../../utils/types'
import { Type } from '../common/Type'
import { Color } from '../../utils/colorSchemes'
import { PenButton } from '../common/PenButton'

export function Name({ gearSet }: { gearSet: GearSet }) {
  const [isEditingName, setIsEditingName] = useState(false)

  const { updateGearSet } = useSiteContext()
  const [name, setName] = useState(gearSet.name)

  return (
    <Type bold color={Color.fg1} size="L">
      {isEditingName ? (
        <>
          <input
            onBlur={() => {
              updateGearSet({ ...gearSet, name })
              setIsEditingName(false)
            }}
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <PenButton onClick={() => setIsEditingName(!isEditingName)} />
        </>
      ) : (
        <>
          {gearSet.name}
          <PenButton onClick={() => setIsEditingName(!isEditingName)} />
        </>
      )}
    </Type>
  )
}
