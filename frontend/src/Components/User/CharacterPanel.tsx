import { useMemo, useState } from 'react'

import { Character } from './Character'
import { API_REQUEST_RESULT } from '../../utils/constants'
import { Type } from '../common/Type'
import Spinner from 'react-spinners/BarLoader'
import { Color } from '../../utils/colorSchemes'
import { useSiteContext } from '../context/useSiteContext'
import { TextInput } from '../common/TextInput'
import { IconButton } from '../common/IconButton'
import { FlexColumn, FlexRow } from '../common/Layout'

export function CharacterPanel() {
  const [characterId, setCharacterId] = useState('')
  const { addCharacter, characters } = useSiteContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [isAddingCharacter, setIsAddingCharacter] = useState(false)

  const charas = useMemo(() => {
    return Object.keys(characters).map((id) => characters[id])
  }, [characters])

  const onAddCharacter = async () => {
    setIsLoading(true)
    setIsAddingCharacter(false)
    setError(null)
    const res = await addCharacter(characterId)
    if (res === API_REQUEST_RESULT.SUCCESS) {
      setCharacterId('')
    } else {
      setError('Failed to Add Character Id')
    }
    setIsLoading(false)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '32px',
          margin: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {charas.map((c) => {
          return <Character character={c} />
        })}
        <FlexColumn
          gap={4}
          justify="flex-start"
          style={{ padding: '8px 0', margin: '8px 0', position: 'relative' }}
        >
          <Type size="S">New Character</Type>
          <img style={{ width: '256px', height: '256px' }} />
          {isAddingCharacter && !isLoading ? (
            <>
              <FlexRow
                style={{
                  width: '50px',
                  height: '50px',
                }}
              >
                <TextInput
                  onChange={(e) => setCharacterId(e)}
                  value={characterId}
                  style={{ minWidth: '160px' }}
                />
                {!isLoading && (
                  <>
                    <IconButton
                      icon="check"
                      size="L"
                      onClick={onAddCharacter}
                    />
                    <IconButton
                      icon="cancel"
                      size="L"
                      onClick={() => {
                        setCharacterId('')
                        setIsAddingCharacter(false)
                      }}
                    />
                  </>
                )}
              </FlexRow>
              {error && (
                <Type color="red" size="S">
                  {error}
                </Type>
              )}
            </>
          ) : (
            <FlexRow justify="center">
              <IconButton
                icon="plus"
                size="XL"
                onClick={() => {
                  setIsAddingCharacter(true)
                }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <Spinner color={Color.fg1} loading={isLoading} />
            </FlexRow>
          )}
        </FlexColumn>
      </div>
    </div>
  )
}
