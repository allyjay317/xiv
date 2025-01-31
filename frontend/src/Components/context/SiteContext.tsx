import React, { useCallback, useEffect, useState } from "react";
import { UserInfo } from "../types";
import { GearPiece, GearSet, Slot } from "../../utils/types";
import { useCharacters } from "./useCharacters";
import { SiteContext } from "./useSiteContext";
import { API_REQUEST_RESULT } from "../../utils/constants";
import { NEW_GEARSET } from "./constants";
import { gearsets } from "../../api/gearset";
import { users } from "../../api/user";

export const SiteProvider = (props: { children: React.ReactNode }) => {
  const [id, setId] = useState<string | null>(localStorage.getItem("id"));
  const [userInfo, setUserInfo] = useState<undefined | UserInfo>();
  const isLoggedIn = !!id;

  const {
    characters,
    setCharacters,
    addCharacter,
    verifyCharacter,
    currentlySelectedCharacter,
    setCurrentlySelectedCharacter,
  } = useCharacters(id);

  const saveGearSet = useCallback(
    async (gearSet: GearSet, cId?: string) => {
      if (!currentlySelectedCharacter) return API_REQUEST_RESULT.FAILURE;
      if (!id) return API_REQUEST_RESULT.NOT_LOGGED_IN;
      try {
        const newGearSet = {
          id,
          name: gearSet.name,
          job: Number(gearSet.job),
          items: gearSet.items,
        };

        const characterId = cId ?? currentlySelectedCharacter;
        const character = characters[characterId];
        const gearSets = character.gearSets.filter(
          (gs) => gs.id !== gearSet.id
        );

        if (gearSet.id === NEW_GEARSET) {
          const { id: gsId } = await gearsets.createGearSet(
            characterId,
            newGearSet
          );
          gearSet.id = gsId;
          gearSets.push({ ...gearSet, modified: false });
        } else {
          await gearsets.updateGearSet(characterId, gearSet.id, newGearSet);
          gearSets.push({ ...gearSet, modified: false });
        }

        setCharacters({
          ...characters,
          [characterId]: {
            ...character,
            gearSets,
          },
        });
        return API_REQUEST_RESULT.SUCCESS;
      } catch (e) {
        return e as Error;
      }
    },
    [currentlySelectedCharacter, id, characters, setCharacters]
  );

  const addGearSet = useCallback(
    (gearSet: GearSet) => {
      if (!currentlySelectedCharacter) return;
      const gearSets = characters[currentlySelectedCharacter].gearSets || [];
      setCharacters({
        ...characters,
        [currentlySelectedCharacter]: {
          ...characters[currentlySelectedCharacter],
          gearSets: [...gearSets, gearSet],
        },
      });
    },
    [characters, currentlySelectedCharacter, setCharacters]
  );

  const deleteGearSet = useCallback(
    async (id: string) => {
      if (!currentlySelectedCharacter) return;
      const gearSets = characters[currentlySelectedCharacter].gearSets || [];
      try {
        await gearsets.deleteGearSet(currentlySelectedCharacter, id);
        setCharacters({
          ...characters,
          [currentlySelectedCharacter]: {
            ...characters[currentlySelectedCharacter],
            gearSets: gearSets.filter((gs) => gs.id !== id),
          },
        });
      } catch (e) {
        return API_REQUEST_RESULT.FAILURE;
      }
    },
    [characters, currentlySelectedCharacter, setCharacters]
  );

  const updateGearSet = useCallback(
    (gearSet: GearSet) => {
      if (!currentlySelectedCharacter) return;
      const gearSets = characters[currentlySelectedCharacter].gearSets || [];
      setCharacters({
        ...characters,
        [currentlySelectedCharacter]: {
          ...characters[currentlySelectedCharacter],
          gearSets: gearSets.map((gs) => {
            if (gs.id === gearSet.id) {
              return { ...gearSet, modified: true };
            }
            return gs;
          }),
        },
      });
    },
    [characters, currentlySelectedCharacter, setCharacters]
  );

  const updateGearPiece = useCallback(
    ({ id, slot, value }: { id: string; slot: Slot; value: GearPiece }) => {
      if (!currentlySelectedCharacter) return;
      const gearSets = characters[currentlySelectedCharacter].gearSets || [];
      const gearSetValue = gearSets.find((gs) => gs.id === id);
      if (!gearSetValue) {
        return;
      }
      const newGearSet: GearSet = {
        ...gearSetValue,
        items: { ...gearSetValue.items, [slot]: value },
      };
      updateGearSet(newGearSet);
    },
    [characters, currentlySelectedCharacter, updateGearSet]
  );

  useEffect(() => {
    if (id && !userInfo) {
      users
        .getUserInfo(id)
        .then((data) => {
          setUserInfo(data.userInfo);
          setCharacters(data.characters);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id, setCharacters, userInfo]);

  const logOut = () => {
    localStorage.removeItem("id");
    setUserInfo(undefined);
    setId(null);
  };

  const logIn = (id: string) => {
    localStorage.setItem("id", id);
    setId(id);
  };

  return (
    <SiteContext.Provider
      value={{
        isLoggedIn,
        userInfo,
        logOut,
        logIn,
        characters,
        addCharacter,
        verifyCharacter,
        updateGearPiece,
        addGearSet,
        deleteGearSet,
        currentlySelectedCharacter,
        updateGearSet,
        setCurrentlySelectedCharacter: (id: string) => {
          setCurrentlySelectedCharacter(id);
        },
        saveGearSet,
      }}
    >
      {props.children}
    </SiteContext.Provider>
  );
};
