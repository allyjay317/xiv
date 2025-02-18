import { Checkbox } from '../common/Checkbox'
import { FlexRow } from '../common/Layout'
import { TextInput } from '../common/TextInput'
import { Type } from '../common/Type'

type BaseTask = {
  label: string
  id: number | string
  editable?: boolean
}

type BoolTask = BaseTask & {
  type: 'bool'
  value: boolean
}

type DisplayTask = BaseTask & {
  type: 'display'
  value: string
}

type TomeTask = BaseTask & {
  type: 'tome'
  value: string
  max: number
}

export type TTask = BoolTask | DisplayTask | TomeTask

export function Task<T>({
  task,
  onChange,
}: {
  task: TTask
  onChange?: (id: string | number, value: T) => void
}) {
  switch (task.type) {
    case 'bool':
      return (
        <Checkbox
          label={task.label}
          value={task.value as boolean}
          onChange={(isChecked) =>
            onChange && onChange(task.id, isChecked as T)
          }
          direction="row"
        />
      )
    case 'display':
      return (
        <Type size="S">
          {task.label} - {task.value}
        </Type>
      )
    case 'tome':
      return (
        <FlexRow>
          <Type size="S" style={{ flexGrow: 2 }}>
            {task.label}
          </Type>
          <TextInput
            value={`${task.value}`}
            onChange={(s) => onChange && onChange(task.id, s as T)}
          />
        </FlexRow>
      )
  }
}
