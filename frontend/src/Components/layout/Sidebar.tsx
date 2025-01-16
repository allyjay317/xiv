import { useMemo } from 'react'
import { useSiteContext } from '../context/SiteContext'
import { Type } from '../common/Type'
import { Color } from '../../utils/colorSchemes'
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../../utils/constants'
import { CharacterSelector } from '../Sidebar/CharacterSelector'
import { Stats } from '../Sidebar/SidebarStats'


export function Sidebar() {
  const language = 'en'

  const { characters, currentlySelectedCharacter } = useSiteContext()

  const userInfo = useMemo(() => {
    if (!currentlySelectedCharacter) return null
    return characters[currentlySelectedCharacter].info
  }, [currentlySelectedCharacter, characters])

  const info = useMemo(() => {
    if (!userInfo) return null
    const name = (
      <Type bold size="M">
        {userInfo.Name}
      </Type>
    )
    const title = <Type size="S">{userInfo.Title[`Name_${language}`]}</Type>
    if (userInfo.TitleTop)
      return (
        <>
          {title} {name}
        </>
      )
    return (
      <>
        {name} {title}
      </>
    )
  }, [userInfo, language])

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
            src={userInfo.Portrait}
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