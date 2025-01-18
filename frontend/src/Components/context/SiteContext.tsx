import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserInfo } from "../types";
import { defaultValues } from "./constants";
import { CharacterInfo } from "./types";
import { GearPiece, GearSet, Slot } from "../../utils/types";
import { XIVUserInfo } from "../common/Type";
import { useCharacters } from "./useCharacters";

const SiteContext = React.createContext(defaultValues);
const apiUrl = import.meta.env.VITE_SERVER_URL

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  return context;
};

export const SiteProvider = (props: any) => {
  const [id, setId] = useState<string | null>(
    localStorage.getItem("id")
  );
  const [userInfo, setUserInfo] = useState<undefined | UserInfo>();
  const isLoggedIn = !!id

  const {
    characters, setCharacters, addCharacter, verifyCharacter, currentlySelectedCharacter, setCurrentlySelectedCharacter
  } = useCharacters(id)


  const addGearSet = useCallback(
    (gearSet: GearSet) => {
      if (!currentlySelectedCharacter) return
      const gearSets = characters[currentlySelectedCharacter].gearSets || []
      setCharacters({
        ...characters,
        [currentlySelectedCharacter]: {
          ...characters[currentlySelectedCharacter],
          gearSets: [...gearSets, gearSet],
        },
      })
    },
    [characters, currentlySelectedCharacter, setCharacters]
  )

  const deleteGearSet = useCallback(
    (id: string) => {
      if (!currentlySelectedCharacter) return
      const gearSets = characters[currentlySelectedCharacter].gearSets || []
      setCharacters({
        ...characters,
        [currentlySelectedCharacter]: {
          ...characters[currentlySelectedCharacter],
          gearSets: gearSets.filter(gs => gs.id !== id),
        },
      })
    },
    [characters, currentlySelectedCharacter, setCharacters]
  )

  const updateGearSet = useCallback(
    (gearSet: GearSet) => {
      if (!currentlySelectedCharacter) return
      const gearSets = characters[currentlySelectedCharacter].gearSets || []
      setCharacters({
        ...characters,
        [currentlySelectedCharacter]: {
          ...characters[currentlySelectedCharacter],
          gearSets: gearSets.map(gs => {
            if (gs.id === gearSet.id) {
              return gearSet
            }
            return gs
          }),
        },
      })
    },
    [characters, currentlySelectedCharacter, setCharacters]
  )

  const updateGearPiece = useCallback(
    ({ id, slot, value }: { id: string; slot: Slot; value: GearPiece }) => {
      if (!currentlySelectedCharacter) return
      const gearSets = characters[currentlySelectedCharacter].gearSets || []
      const gearSetValue = gearSets.find(gs => gs.id === id)
      if (!gearSetValue) {
        return
      }
      const newGearSet: GearSet = {
        ...gearSetValue,
        items: { ...gearSetValue.items, [slot]: value },
      }
      updateGearSet(newGearSet)
    },
    [characters, currentlySelectedCharacter, updateGearSet]
  )

  useEffect(() => {
    if (id && !userInfo) {
      axios({
        method: "get",
        url: `${apiUrl}/user`,
        params: {
          id
        }
      }).then((info) => {
        const {data: {characters, ...uInfo}} = info
        setUserInfo(uInfo as UserInfo);
        const newCharacters: Record<string, CharacterInfo> = {};
        (characters as XIVUserInfo[]).forEach((c:XIVUserInfo) => {
          newCharacters[c.id] = {
            info: c,
            gearSets: [],
            verified: true,
          }
        })
        setCharacters(newCharacters)
      }).catch(e => {
        console.log(e)
      });
    }
  }, [id]);

  const logOut = () => {
    localStorage.removeItem("id");
    setUserInfo(undefined);
    setId(null);
  };

  const logIn = (id: string) => {
    localStorage.setItem("id", id);
    setId(id)
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
          setCurrentlySelectedCharacter(id)
        },
      }}
    >
      {props.children}
    </SiteContext.Provider>
  );
};
