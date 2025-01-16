import { useMemo } from 'react'
import { useSiteContext } from '../context/SiteContext'
import { Select } from '../common/Select'


export function CharacterSelector() {
  const {
    characters,
    currentlySelectedCharacter,
    setCurrentlySelectedCharacter,
  } = useSiteContext()

  const characterOptions = useMemo(() => {
    const options = Object.keys(characters).map(key => {
      return {
        label: characters[key].info.Name,
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
