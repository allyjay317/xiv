
import { Button } from "../common/Button";
import { Type } from "../common/Type";
import { CharacterInfo } from "../context/types";
import { useSiteContext } from "../context/SiteContext";
import {v4 as uuidv4 } from 'uuid'

export function Character({character}: {character: CharacterInfo}){
    const {verifyCharacter} = useSiteContext()
    const {verified} = character
    const verifyPhrase = `xiv-${uuidv4()}`

    const onVerify = () => {
        verifyCharacter(`${character.info.id}`, verifyPhrase)
    }

    return (
              <div key={character.info.id} style={{display: 'flex', flexDirection: 'column', width: '200px', alignItems: 'center', gap: '4px', margin: '8px', padding: '8px'}}>
                <Type size="S">{character.info.name}</Type>
                <img
                  alt={`${character.info.name}'s Avatar`}
                  src={character.info.avatar}
                />
                {!verified && 
                <>
                    <Type size="S">Place `{verifyPhrase}` in your bio to verify</Type>
                    <Button label='verify' onClick={onVerify} />
                </>}
              </div>
            )
}