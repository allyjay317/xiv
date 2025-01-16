import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserInfo } from "../types";
import { defaultValues, testUser } from "./constants";
import { CharacterInfo } from "./types";
import { GearPiece, GearSet, Slot } from "../../utils/types";

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

  const [characters, setCharacters] = useState<
    Record<string, CharacterInfo>
  >({})

  const [currentlySelectedCharacter, setCurrentlySelectedCharacter] = useState<
    string | undefined
  >()

  const addCharacter = useCallback(
    async (id: string) => {
      try {
        setCharacters({
          ...characters,
          [id]: testUser,
          })
        if(!currentlySelectedCharacter){
          setCurrentlySelectedCharacter(id)
        }
        return 'Success'
      } catch (e) {
        return e as Error
      }
    },
    [characters]
  )

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
        setUserInfo(info.data as UserInfo);
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
