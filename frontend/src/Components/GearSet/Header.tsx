import { useState } from 'react'
import { Jobs } from '../../utils/types'
import { Color } from '../../utils/colorSchemes'
import { IconButton } from '../common/IconButton'
import styled from '@emotion/styled'
import { FlexColumn, FlexRow } from '../common/Layout'
import { JobSelector } from './JobSelector'

const AbsoluteContainer = styled.div`
  position: absolute;
  height: 100%;
`

const Container = styled(FlexRow)`
  position: sticky;
  max-height: 380px;
  top: 16px;
  width: 100%;
  z-index: 100;
  right: 0;
  left 0;
`

export function Header({
  onAdd,
  onSave,
}: {
  onAdd: (job: Jobs) => void
  onSave: VoidFunction
}) {
  const [isSetCreatorOpen, setIsSetCreatorOpen] = useState(false)

  return (
    <AbsoluteContainer>
      <Container
        style={{
          backgroundColor: isSetCreatorOpen ? Color.bg1 : undefined,
        }}
        wrap="wrap"
      >
        <FlexColumn
          style={{
            marginRight: '16px',
          }}
        >
          <IconButton
            icon={isSetCreatorOpen ? 'cancel' : 'plus'}
            size="L"
            onClick={() => {
              setIsSetCreatorOpen(!isSetCreatorOpen)
            }}
          />
          <IconButton icon="save" size="L" onClick={onSave} />
        </FlexColumn>
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
