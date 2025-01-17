import { useMemo, useState } from 'react'

import { Button } from '../common/Button'
import { useSiteContext } from '../context/SiteContext'
import { Character } from './Character'

export function AddCharacterPage() {
  const [characterId, setCharacterId] = useState('')
  const { addCharacter, characters } = useSiteContext()

  const charas = useMemo(() => {
    return Object.keys(characters).map(id => characters[id])
  }, [characters])

  return (
    <div>
      <div style={{display: 'flex'}}>
      <input
        onChange={e => setCharacterId(e.target.value)}
        type="text"
        value={characterId}
      />
      <Button
        label="Add Character"
        onClick={async () => {
          addCharacter(characterId)
          setCharacterId('')
        }}
      />
      </div>
      <div style={{display: 'flex', gap: '32px', margin: '32px'}}>
      {charas.map(c => {
        
        return <Character character={c} />
      })}
      </div>
    </div>
  )
}
