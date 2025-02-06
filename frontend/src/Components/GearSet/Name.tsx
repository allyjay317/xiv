import { useState } from 'react'
import { GearSet } from '../../utils/types'
import { Type } from '../common/Type'
import { Color } from '../../utils/colorSchemes'
import { IconButton } from '../common/IconButton'
import { useSiteContext } from '../context/useSiteContext'
import { TextInput } from '../common/TextInput'

export function Name({
  gearSet,
  compact,
  editable,
}: {
  gearSet: GearSet
  compact: boolean
  editable: boolean
}) {
  const [isEditingName, setIsEditingName] = useState(false)

  const { updateGearSet } = useSiteContext()
  const [name, setName] = useState(gearSet.name)

  return (
    <>
      {isEditingName ? (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TextInput
            onBlur={() => {
              updateGearSet({ ...gearSet, name })
              setIsEditingName(false)
            }}
            onChange={(e) => setName(e)}
            value={name}
            size={compact ? 'XS' : 'M'}
          />
          <IconButton
            onClick={() => setIsEditingName(!isEditingName)}
            icon="pen"
          />
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Type bold color={Color.fg1} size={compact ? 'S' : 'L'}>
            {gearSet.name}
          </Type>
          {editable && (
            <IconButton
              onClick={() => setIsEditingName(!isEditingName)}
              icon="pen"
            />
          )}
        </div>
      )}
    </>
  )
}
