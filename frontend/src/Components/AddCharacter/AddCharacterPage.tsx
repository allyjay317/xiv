import { useState } from 'react'

import { Button } from '../common/Button'
import { Type } from '../common/Type'
import { useSiteContext } from '../context/SiteContext'

export function AddCharacterPage() {
  const [characterId, setCharacterId] = useState('')
  const { addCharacter, characters } = useSiteContext()
  const [error, setError] = useState<Error | null>()
  return (
    <div>
      <input
        onChange={e => setCharacterId(e.target.value)}
        type="text"
        value={characterId}
      />
      <Button
        label="Add Character"
        onClick={async () => {
          const result = await addCharacter(characterId)
          if (result instanceof Error) {
            setError(result)
          }
          setCharacterId('')
        }}
      />
      {error && (
        <Type color="Red" size="S">
          {error.message}
        </Type>
      )}
      {Object.keys(characters).map(id => {
        const character = characters[id]
        return (
          <div key={id}>
            <Type size="S">{character.info.Name}</Type>
            <img
              alt={`${character.info.Name}'s Avatar`}
              src={character.info.Avatar}
            />
          </div>
        )
      })}
    </div>
  )
}
