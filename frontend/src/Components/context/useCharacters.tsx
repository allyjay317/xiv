import axios from "axios"
import { useCallback, useState } from "react"
import { CharacterInfo } from "./types"
import { API_REQUEST_RESULT } from "../../utils/constants"

const apiUrl = import.meta.env.VITE_SERVER_URL

export function useCharacters(id: string | null){
      const [characters, setCharacters] = useState<
        Record<string, CharacterInfo>
      >({})
        const [currentlySelectedCharacter, setCurrentlySelectedCharacter] = useState<
          string | undefined
        >()

    const addCharacter = useCallback(
        async (newId: string) => {
            if(characters[newId]){
                return API_REQUEST_RESULT.ALREADY_EXISTS
            }
          try {
            const res = await axios.post(`${apiUrl}/character`, {
              id,
              lodestone_id: newId
            })
              console.log(res)
              setCharacters({
                ...characters,
                [newId]: {
                  info: res.data,
                  gearSets: [],
                  verified: false
                },
                })
                if(!currentlySelectedCharacter){
                  setCurrentlySelectedCharacter(newId)
                }
                return API_REQUEST_RESULT.SUCCESS
            
            
          } catch (e) {
            return e as Error
          }
        },
        [characters, currentlySelectedCharacter, id]
      )
    
      const verifyCharacter = useCallback(async (lodestoneId: string, verifyPhrase: string) => {
        const res = await axios.post(`${apiUrl}/character/verify`, {
          lodestone_id: lodestoneId,
          id,
          verify_code: verifyPhrase
        })
        try{
            if(res.status === 202){
                const newCharacters = {
                    ...characters,
                    [lodestoneId]: {
                      ...characters[lodestoneId],
                      verified: true
                    }
                  }
                setCharacters(newCharacters)
                return API_REQUEST_RESULT.SUCCESS
              } else {
                return API_REQUEST_RESULT.FAILURE
              }
        } catch(error){
            return error as Error
        }
          
        
      }, [id, characters])

      return {
        characters, setCharacters, addCharacter, verifyCharacter, currentlySelectedCharacter, setCurrentlySelectedCharacter
      }
}