import { Button } from '../common/Button'
import { Type } from '../common/Type'
import { CharacterInfo } from '../context/types'
import { v4 as uuidv4 } from 'uuid'
import { useMemo, useState } from 'react'
import { API_REQUEST_RESULT } from '../../utils/constants'
import Spinner from 'react-spinners/BarLoader'
import { Color } from '../../utils/colorSchemes'
import { useSiteContext } from '../context/useSiteContext'

export function Character({ character }: { character: CharacterInfo }) {
  const { verifyCharacter, deleteCharacter, updateCharacter } = useSiteContext()
  const { verified } = character
  const verifyPhrase = useMemo(() => {
    return `xiv-${uuidv4()}`
  }, [])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const onVerify = async () => {
    setError(null)
    setLoading(true)
    const res = await verifyCharacter(`${character.info.id}`, verifyPhrase)
    if (res === API_REQUEST_RESULT.FAILURE) {
      setError('Failed to Verify')
    }
    setLoading(false)
  }

  const onDelete = async () => {
    setError(null)
    setLoading(true)
    const res = await deleteCharacter(character.info.id)
    if (res === API_REQUEST_RESULT.FAILURE) {
      setError('Failed to Delete')
    }
    setLoading(false)
  }

  const onUpdate = async () => {
    setError(null)
    setLoading(true)
    const res = await updateCharacter(character.info.id)
    if (res === API_REQUEST_RESULT.FAILURE) {
      setError('Failed to update')
    }
    setLoading(false)
  }

  return (
    <div
      key={character.info.id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        alignItems: 'center',
        gap: '4px',
        margin: '8px',
        padding: '8px',
      }}
    >
      <Type size="S">{character.info.name}</Type>
      <img
        alt={`${character.info.name}'s Avatar`}
        src={character.info.avatar}
      />
      {!verified ? (
        <>
          <div style={{ width: '300px' }}>
            <Type size="S">Place</Type>
            <Type
              size="S"
              style={{
                backgroundColor: Color.bg1,
                border: `1px dashed ${Color.fg1}`,
                margin: '4px 0',
              }}
            >
              {verifyPhrase}
            </Type>
            <Type size="S">in your bio to verify</Type>
          </div>
          {!isLoading && <Button label="Verify" onClick={onVerify} />}

          <Type size="S" color="red">
            {error}
          </Type>
        </>
      ) : (
        <div style={{ display: 'flex' }}>
          <Button label="Update" onClick={onUpdate} />
          <Button label="Delete" onClick={onDelete} />
        </div>
      )}
      <Spinner color={Color.fg1} loading={isLoading} />
      {error}
    </div>
  )
}
