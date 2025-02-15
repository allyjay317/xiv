import styled from '@emotion/styled'
import { ComponentProps, useMemo } from 'react'

import { GearPieceDisplay } from './GearPiece'
import { GearSet, Slot } from '../../utils/types'
import { Color } from '../../utils/colorSchemes'
import { Button } from '../common/Button'
import { useSiteContext } from '../context/useSiteContext'
import { MenuButton, TMenuItem } from '../common/MenuButton'
import { NEW_GEARSET } from '../context/constants'
import { GearSetHeader } from './GearSetHeader'
import { FlexColumn, FlexRow } from '../common/Layout'

const Container = styled.div`
  background-color: ${Color.bg1};
  border: 1px solid ${Color.fg1};
  border-radius: 5%;
  padding: 16px;
  position: relative;
  width: fit-content;
`

const Menu = styled.div`
  cursor: pointer;
  position: absolute;
  right: 32px;
  top: 32px;
  display: flex;
`

function withId(id: string) {
  return function GearPiece(
    props: Omit<ComponentProps<typeof GearPieceDisplay>, 'id'>,
  ) {
    return <GearPieceDisplay {...props} id={id} />
  }
}

export function GearSetContainer({
  gearSet,
  onDelete,
}: {
  gearSet: GearSet
  onDelete: (id: string) => void
}) {
  const { characters, saveGearSet, selectedCharacter } = useSiteContext()

  const onSave = () => {
    saveGearSet(gearSet)
  }

  const GearPiece = withId(gearSet.id)

  const characterItems: TMenuItem[] = useMemo(() => {
    return Object.keys(characters)
      .filter((c) => c !== selectedCharacter)
      .map((c) => {
        return {
          type: 'button',
          label: characters[c].info.name,
          onClick: () =>
            saveGearSet(
              { ...gearSet, id: NEW_GEARSET },
              `${characters[c].info.id}`,
            ),
        }
      })
  }, [characters])

  return (
    <Container>
      <Menu>
        {gearSet.modified && (
          <Button
            label="Save"
            onClick={onSave}
            state={gearSet.modified ? 'default' : 'disabled'}
          />
        )}

        <MenuButton
          direction="right"
          width="10px"
          label=":"
          menuItems={[
            {
              type: 'button',
              label: 'Delete',
              onClick: () => onDelete(gearSet.id),
            },
            {
              type: 'menu',
              label: 'Copy to another character',
              menuItems: characterItems,
            },
          ]}
          config={{
            type: 'icon',
            icon: 'menu',
            color: Color.fg1,
          }}
        />
      </Menu>

      <GearSetHeader gearSet={gearSet} />
      <FlexRow gap="16">
        <FlexColumn gap="16">
          <GearPiece
            gearPiece={gearSet.items[Slot.WEAPON]}
            slot={Slot.WEAPON}
          />
          <GearPiece gearPiece={gearSet.items[Slot.HEAD]} slot={Slot.HEAD} />
          <GearPiece gearPiece={gearSet.items[Slot.BODY]} slot={Slot.BODY} />
          <GearPiece gearPiece={gearSet.items[Slot.HANDS]} slot={Slot.HANDS} />
          <GearPiece gearPiece={gearSet.items[Slot.LEGS]} slot={Slot.LEGS} />
          <GearPiece gearPiece={gearSet.items[Slot.FEET]} slot={Slot.FEET} />
        </FlexColumn>
        <FlexColumn gap="16">
          <GearPiece
            gearPiece={gearSet.items[Slot.EARRINGS]}
            slot={Slot.EARRINGS}
          />
          <GearPiece
            gearPiece={gearSet.items[Slot.NECKLACE]}
            slot={Slot.NECKLACE}
          />
          <GearPiece
            gearPiece={gearSet.items[Slot.BRACELET]}
            slot={Slot.BRACELET}
          />
          <GearPiece gearPiece={gearSet.items[Slot.RING1]} slot={Slot.RING1} />
          <GearPiece gearPiece={gearSet.items[Slot.RING2]} slot={Slot.RING2} />
        </FlexColumn>
      </FlexRow>
    </Container>
  )
}
