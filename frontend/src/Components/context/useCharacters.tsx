import { useCallback, useState } from "react";
import { CharacterInfo } from "./types";
import { API_REQUEST_RESULT } from "../../utils/constants";
import { characters as apiCharacters } from "../../api/characters";
import { gearsets } from "../../api/gearset";
import { GearSet } from "../../utils/types";

const gsSort = (a: GearSet, b: GearSet) => a.id.localeCompare(b.id)

export function useCharacters(id: string | null) {
  const [characters, setCharacters] = useState<Record<string, CharacterInfo>>(
    {}
  );
  const [selectedCharacter, setselectedCharacter] = useState<
    string | undefined
  >();

  const addCharacter = useCallback(
    async (newId: string) => {
      if (!id) {
        return API_REQUEST_RESULT.NOT_LOGGED_IN;
      }
      if (characters[newId]) {
        return API_REQUEST_RESULT.ALREADY_EXISTS;
      }
      try {
        const res = await apiCharacters.searchCharacter(id, newId);
        setCharacters({
          ...characters,
          [newId]: {
            info: res,
            gearSets: [],
            verified: false,
          },
        });
        if (!selectedCharacter) {
          setselectedCharacter(newId);
        }
        return API_REQUEST_RESULT.SUCCESS;
      } catch (e) {
        return e as Error;
      }
    },
    [characters, selectedCharacter, id]
  );

  const onChangeCharacter = useCallback(
    async (characterId?: string) => {
      if (!characterId) {
        setselectedCharacter(undefined);
        return;
      }
      try {
        const data = await gearsets.getGearsets(characterId);
        setCharacters({
          ...characters,
          [characterId]: {
            ...characters[characterId],
            gearSets: data.sort(gsSort),
          },
        });
        setselectedCharacter(characterId);
      } catch (e) {
        console.log(e);
      }
    },
    [characters]
  );

  const verifyCharacter = useCallback(
    async (lodestoneId: string, verifyPhrase: string) => {
      if (!id) return API_REQUEST_RESULT.NOT_LOGGED_IN;
      try {
        await apiCharacters.checkVerification({
          lodestone_id: lodestoneId,
          id,
          verify_code: verifyPhrase,
        });
        const newCharacters = {
          ...characters,
          [lodestoneId]: {
            ...characters[lodestoneId],
            verified: true,
          },
        };
        setCharacters(newCharacters);
        return API_REQUEST_RESULT.SUCCESS;
      } catch (error) {
        console.error(error);
        return API_REQUEST_RESULT.FAILURE;
      }
    },
    [id, characters]
  );

  const deleteCharacter = useCallback(
    async (characterId: number) => {
      try {
        await apiCharacters.deleteCharacter({character_id: characterId})
        setselectedCharacter(undefined)
        const v = Object.entries(characters).filter(([cId]) => cId !== ""+characterId)
        const newCharacters: Record<string, CharacterInfo> = {}
        v.forEach(([i, v]) => {
          newCharacters[i] = v
        })
        setCharacters(newCharacters)
        return API_REQUEST_RESULT.SUCCESS
      } catch (e) {
        console.error(e)
        return API_REQUEST_RESULT.FAILURE
      }
      
    }, [characters]
  )

  const updateCharacter = useCallback(
    async (characterId: number) => {
      try {
        const res = await apiCharacters.updateCharacter(characterId)
        const chara = characters[characterId]
        setCharacters({...characters, [characterId]: {
          ...chara,
          info: res
        }})
        return API_REQUEST_RESULT.SUCCESS
       } catch (e){
        return API_REQUEST_RESULT.FAILURE
       }
    }, [characters]
  )

  const loadCharacters = useCallback(async (newCharacters: Record<string, CharacterInfo>) => {
    const ids = Object.keys(newCharacters)
    const oldIds = Object.keys(characters)
    const promises: Promise<[string, GearSet[]]>[] = []
    const nc: Record<string, CharacterInfo> = {
      ...newCharacters
    }
    ids.forEach(i => {
      if(!oldIds.includes(i)){
        promises.push(new Promise(async (resolve, reject) => {
          try{
            const res = await gearsets.getGearsets(i)
            resolve([i, res])
          } catch(e) {
            reject(e)
          }
        }))
      }
    })
    const res = await Promise.all(promises)
    res.forEach(([i, r]) => {
      nc[i] = {
        ...newCharacters[i],
        gearSets: r.sort(gsSort)
      }
    })
    setCharacters(nc)
  }, [])

  const onSetCharacters = useCallback(async (newCharacters: Record<string, CharacterInfo>) => {
    const ids = Object.keys(newCharacters)
    const nc: Record<string, CharacterInfo> = {}
    ids.forEach(i => {
      const newGearSets = newCharacters[i].gearSets.sort(gsSort)
      nc[i] = {
        ...newCharacters[i],
        gearSets: newGearSets

      }
    })
    setCharacters(nc)
  }, [])

  

  return {
    characters,
    setCharacters: onSetCharacters,
    loadCharacters,
    addCharacter,
    verifyCharacter,
    selectedCharacter,
    setselectedCharacter: onChangeCharacter,
    deleteCharacter,
    updateCharacter
  };
}
