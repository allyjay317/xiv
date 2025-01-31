import { useState } from 'react'
import { GearSet } from '../../utils/types'
import { Type } from '../common/Type'
import { Color } from '../../utils/colorSchemes'
import { PenButton } from '../common/PenButton'
import { useSiteContext } from '../context/useSiteContext'
import { TextInput } from '../common/TextInput'

export function Name({ gearSet }: { gearSet: GearSet }) {
  const [isEditingName, setIsEditingName] = useState(false)

  const { updateGearSet } = useSiteContext()
  const [name, setName] = useState(gearSet.name)

  return (
      <>
      {isEditingName ? (
        <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
          <TextInput
            onBlur={() => {
              updateGearSet({ ...gearSet, name })
              setIsEditingName(false)
            }}
            onChange={e => setName(e)}
            value={name}
            size='M'
          />
          <PenButton onClick={() => setIsEditingName(!isEditingName)} />
        </div>
      ) : (
        <div style={{display: 'flex', alignItems: 'center'}}>
        <Type bold color={Color.fg1} size="L">{gearSet.name}</Type>
          <PenButton onClick={() => setIsEditingName(!isEditingName)} />
        </div>
      )}
    </>
  )
}
