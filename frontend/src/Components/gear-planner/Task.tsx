import { Checkbox } from '../common/Checkbox'

export function Task({
  task,
  onChange,
}: {
  task: any
  onChange: (id: number, isChecked: boolean) => void
}) {
  switch (task.type) {
    case 'bool':
      return (
        <Checkbox
          label={task.label}
          value={task.value}
          onChange={(isChecked) => onChange(task.id, isChecked)}
          direction="row"
        />
      )
  }
}
