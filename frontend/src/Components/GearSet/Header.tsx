import { useState } from 'react'
import { Jobs } from '../../utils/types'
import { Color } from '../../utils/colorSchemes'
import { IconButton } from '../common/IconButton'
import styled from '@emotion/styled'
import { FlexRow } from '../common/Layout'
import { JobSelector } from './JobSelector'
import { useSiteContext } from '../context/useSiteContext'
import { useMediaQuery } from '@react-hook/media-query'
import { PriorityModal } from './PriorityModal'

const AbsoluteContainer = styled.div`
  position: absolute;
  height: 100%;
`

const Container = styled(FlexRow)`
  position: sticky;
  max-height: 380px;
  top: 16px;
  width: fit-content;
  z-index: 100;
  right: 0;
  left 0;
  padding: 8px;
`

export function Header({
  onAdd,
  onSave,
  hasNewGearSets,
}: {
  onAdd: (job: Jobs) => void
  onSave: VoidFunction
  hasNewGearSets: boolean
}) {
  const [isSetCreatorOpen, setIsSetCreatorOpen] = useState(false)
  const { modifiedGearSets } = useSiteContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const query = useMediaQuery('only screen and (min-width: 1020px)')

  return (
    <AbsoluteContainer style={{ left: query ? undefined : '32px' }}>
      <PriorityModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Container
        style={{
          borderRadius: '15px',
          backgroundColor: isSetCreatorOpen || !query ? Color.bg1 : undefined,
          left: query ? undefined : 16,
        }}
        wrap="wrap"
      >
        <div
          style={{
            marginRight: '16px',
            display: 'flex',
            flexDirection: query ? 'column' : 'row',
            gap: query ? undefined : '16px',
          }}
        >
          <IconButton
            icon={isSetCreatorOpen ? 'cancel' : 'plus'}
            size="L"
            onClick={() => {
              setIsSetCreatorOpen(!isSetCreatorOpen)
            }}
          />
          {!isSetCreatorOpen && (
            <>
              {(modifiedGearSets || hasNewGearSets) && !isSetCreatorOpen && (
                <IconButton icon="save" size="L" onClick={onSave} />
              )}
              <IconButton
                icon="menu"
                size="L"
                onClick={() => setIsModalOpen(true)}
              />
            </>
          )}
        </div>
        <FlexRow wrap="wrap">
          {isSetCreatorOpen && (
            <JobSelector
              onSelect={(job) => {
                onAdd(job)
                setIsSetCreatorOpen(false)
              }}
              type="list"
            />
          )}
        </FlexRow>
      </Container>
    </AbsoluteContainer>
  )
}
