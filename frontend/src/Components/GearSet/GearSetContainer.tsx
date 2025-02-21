import styled from '@emotion/styled'
import { ComponentProps, useMemo } from 'react'

import { GearPieceDisplay } from './GearPiece'
import { GearPiece, GearSet, Jobs, Slot } from '../../utils/types'
import { Color } from '../../utils/colorSchemes'
import { useSiteContext } from '../context/useSiteContext'
import { MenuButton, TMenuItem } from '../common/MenuButton'
import { NEW_GEARSET } from '../context/constants'
import { GearSetHeader } from './GearSetHeader'
import { FlexColumn, FlexRow } from '../common/Layout'
import { Type } from '../common/Type'
import { useMediaQuery } from '@react-hook/media-query'
import { Icon } from '../common/IconButton'

const Container = styled.div`
  background-color: ${Color.bg1};
  border: 2px solid ${Color.bg3};
  border-radius: 15px;
  padding: 16px;
  position: relative;
  width: fit-content;
`

const Menu = styled.div<{ compact?: boolean }>`
  position: absolute;
  right: ${(props) => (props.compact ? '16px' : '32px')};
  top: ${(props) => (props.compact ? '16px' : '32px')};
  display: flex;
  user-select: none;
`

function withProps(
  job: Jobs,
  onEdit: (props: { slot: Slot; value: GearPiece }) => void,
) {
  return function GearPiece(
    props: Omit<
      ComponentProps<typeof GearPieceDisplay>,
      'id' | 'job' | 'onEdit'
    >,
  ) {
    return (
      <GearPieceDisplay
        {...props}
        job={job}
        onEdit={({ slot, value }: { slot: Slot; value: GearPiece }) =>
          onEdit({ slot, value })
        }
      />
    )
  }
}

export function GearSetContainer({
  gearSet,
  onDelete,
  onEdit,
  onArchive,
}: {
  gearSet: GearSet
  onDelete: (id: string) => void
  onEdit?: (gearSet: GearSet) => void
  onArchive?: (id: string) => void
}) {
  const { characters, saveGearSet, selectedCharacter } = useSiteContext()
  const query = useMediaQuery('only screen and (min-width: 1020px)')

  const onGearPieceEdit = ({ slot, value }: { slot: Slot; value: GearPiece }) =>
    onEdit &&
    onEdit({
      ...gearSet,
      items: {
        ...gearSet.items,
        [slot]: value,
      },
    })

  const GearPiece = withProps(gearSet.job, onGearPieceEdit)

  const gap = query ? '16' : '8'

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

  const editText = useMemo(() => {
    if (gearSet.archived) {
      return <Icon type="cancel" />
    }
    if (gearSet.modified) {
      return (
        <Type size="M">{gearSet.id.startsWith(NEW_GEARSET) ? 'New' : '*'}</Type>
      )
    }
    return <></>
  }, [gearSet])

  return (
    <Container>
      <Menu compact={!query}>
        {editText}

        <MenuButton
          direction="right"
          width="10px"
          label="Menu"
          size={query ? 'S' : 'XS'}
          menuItems={[
            {
              type: 'button',
              label: 'Delete',
              onClick: () => onDelete(gearSet.id),
            },
            ...(onArchive !== undefined
              ? [
                  {
                    type: 'button',
                    label: gearSet.archived ? 'Unarchive' : 'Archive',
                    onClick: () => onArchive(gearSet.id),
                  } as TMenuItem,
                ]
              : []),
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

      <GearSetHeader gearSet={gearSet} compact={!query} onEdit={onEdit} />
      <FlexRow gap={gap}>
        <FlexColumn gap={gap}>
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
        <FlexColumn gap={gap}>
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
