import { useMemo } from 'react'
import { Select } from '../../common/Select'
import { useSiteContext } from '../../context/useSiteContext'


export function CharacterSelector() {
  const {
    characters,
    currentlySelectedCharacter,
    setCurrentlySelectedCharacter,
  } = useSiteContext()

  const characterOptions = useMemo(() => {
    const options = Object.keys(characters).map(key => {
      return {
        label: characters[key].info.name,
        value: key,
      }
    })
    return [{ label: 'None', value: '' }, ...options]
  }, [characters])

  return (
    <div>
      <Select
        onChange={value => setCurrentlySelectedCharacter(value)}
        options={characterOptions}
        value={currentlySelectedCharacter}
      />
    </div>
  )
}
