import { useState } from 'react'
import { Button } from '../common/Button'
import { Jobs } from '../../utils/types'
import { JobInfo } from '../../utils/constants'


export function Header({ onAdd }: { onAdd: (job: Jobs) => void }) {
  const [isSetCreatorOpen, setIsSetCreatorOpen] = useState(false)
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        left: 0,
        paddingTop: '16px',
        position: 'sticky',
        right: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      <Button
        label={isSetCreatorOpen ? 'X' : '+'}
        onClick={() => {
          setIsSetCreatorOpen(!isSetCreatorOpen)
        }}
      />
      {isSetCreatorOpen &&
        Object.keys(Jobs).map(job => {
          return (
            <div
              key={JobInfo[job as Jobs].name}
              onClick={() => {
                onAdd(job as Jobs)
                setIsSetCreatorOpen(false)
              }}
            >
              <img
                alt={`Add new ${JobInfo[job as Jobs].name} gearset`}
                src={JobInfo[job as Jobs].icon}
                style={{ cursor: 'pointer', height: '50px', width: '50px' }}
              />
            </div>
          )
        })}
    </div>
  )
}
