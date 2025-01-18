import { useMemo, useState } from 'react'

import { Button } from '../common/Button'
import { useSiteContext } from '../context/SiteContext'
import { Character } from './Character'
import { API_REQUEST_RESULT } from '../../utils/constants'
import { Type } from '../common/Type'
import ClipLoader from 'react-spinners/ClipLoader'
import { Color } from '../../utils/colorSchemes'

export function AddCharacterPage() {
  const [characterId, setCharacterId] = useState('')
  const { addCharacter, characters } = useSiteContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const charas = useMemo(() => {
    return Object.keys(characters).map(id => characters[id])
  }, [characters])

  const onAddCharacter = async () => {
    setIsLoading(true)
    setError(null)
    const res = await addCharacter(characterId)
    if(res === API_REQUEST_RESULT.SUCCESS){
      setCharacterId('')
    } else {
      setError("Failed to Add Character Id")
    }
    setIsLoading(false)
  }

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
        onClick={onAddCharacter}
        state={isLoading ? 'disabled' : 'default'}
      />
      <ClipLoader color={Color.fg1} loading={isLoading} />
      </div>
      {error && <Type color='red' size="S">{error}</Type>}
      <div style={{display: 'flex', gap: '32px', margin: '32px'}}>
      {charas.map(c => {
        return <Character character={c} />
      })}
      </div>
    </div>
  )
}
