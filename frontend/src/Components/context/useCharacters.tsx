import { useCallback, useState } from "react";
import { CharacterInfo } from "./types";
import { API_REQUEST_RESULT } from "../../utils/constants";
import { characters as apiCharacters } from "../../api/characters";
import { gearsets } from "../../api/gearset";

export function useCharacters(id: string | null) {
  const [characters, setCharacters] = useState<Record<string, CharacterInfo>>(
    {}
  );
  const [currentlySelectedCharacter, setCurrentlySelectedCharacter] = useState<
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
        if (!currentlySelectedCharacter) {
          setCurrentlySelectedCharacter(newId);
        }
        return API_REQUEST_RESULT.SUCCESS;
      } catch (e) {
        return e as Error;
      }
    },
    [characters, currentlySelectedCharacter, id]
  );

  const onChangeCharacter = useCallback(
    async (characterId: string) => {
      if (!characterId) {
        setCurrentlySelectedCharacter(undefined);
        return;
      }
      try {
        const data = await gearsets.getGearsets(characterId);
        setCharacters({
          ...characters,
          [characterId]: {
            ...characters[characterId],
            gearSets: data,
          },
        });
        setCurrentlySelectedCharacter(characterId);
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

  return {
    characters,
    setCharacters,
    addCharacter,
    verifyCharacter,
    currentlySelectedCharacter,
    setCurrentlySelectedCharacter: onChangeCharacter,
  };
}
