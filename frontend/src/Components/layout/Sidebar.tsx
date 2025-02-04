import { useMemo } from 'react'
import { Type } from '../common/Type'
import { Color } from '../../utils/colorSchemes'
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../../utils/constants'
import { CharacterSelector } from './Sidebar/CharacterSelector'
import { Stats } from './Sidebar/SidebarStats'
import { useSiteContext } from '../context/useSiteContext'


export function Sidebar() {

  const { characters, selectedCharacter } = useSiteContext()

  const userInfo = useMemo(() => {
    if (!selectedCharacter) return null
    return characters[selectedCharacter].info
  }, [selectedCharacter, characters])

  const info = useMemo(() => {
    if (!userInfo) return null
    const name = (
      <Type bold size="M">
        {userInfo.name}
      </Type>
    )

    return name
  }, [userInfo])

  return (
    <div
      style={{
        backgroundColor: Color.ui,
        borderRight: `4px solid ${Color.fg1}`,
        boxSizing: 'border-box',
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '15px 0',
        textAlign: 'center',
        width: `${SIDEBAR_WIDTH}px`,
      }}
    >
      <CharacterSelector />
      {userInfo ? (
        <>
          {info}
          <img
            alt="Character Portrait"
            src={userInfo.portrait}
            style={{ width: `${SIDEBAR_WIDTH - 30}px` }}
          />
          <Stats />
        </>
      ) : (
        <Type bold size="M">
          Select a character
        </Type>
      )}
    </div>
  )
}
