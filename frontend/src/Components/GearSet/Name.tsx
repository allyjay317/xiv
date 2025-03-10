import { useState } from 'react'
import { GearSet } from '../../utils/types'
import { Type } from '../common/Type'
import { Color } from '../../utils/colorSchemes'
import { IconButton } from '../common/IconButton'
import { TextInput } from '../common/TextInput'

export function Name({
  gearSet,
  compact,
  editable,
  onEdit,
}: {
  gearSet: GearSet
  compact: boolean
  editable: boolean
  onEdit?: (gearSet: GearSet) => void
}) {
  const [isEditingName, setIsEditingName] = useState(false)

  const [name, setName] = useState(gearSet.name)

  const onConfirm = () => {
    onEdit && onEdit({ ...gearSet, name })
    setIsEditingName(false)
  }

  return (
    <Type
      color={Color.fg1}
      size={compact ? 'S' : 'L'}
      style={{
        display: 'flex',
        ...(!compact && { marginBottom: '8px', height: '32px' }),
      }}
    >
      {isEditingName ? (
        <>
          <TextInput
            onBlur={onConfirm}
            onChange={(e) => setName(e)}
            value={name}
            size={compact ? 'XS' : 'S'}
          />
          <IconButton onClick={onConfirm} icon="check" size="M" />
          <IconButton
            onClick={() => setIsEditingName(!isEditingName)}
            icon="cancel"
            size="M"
          />
        </>
      ) : (
        <>
          {gearSet.name}
          {editable && (
            <IconButton
              onClick={() => setIsEditingName(!isEditingName)}
              icon="pen"
              size="S"
            />
          )}
        </>
      )}
    </Type>
  )
}
