import axios, { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { UserInfo } from "../types";
import { CharacterInfo } from "./types";
import { GearPiece, GearSet, Slot } from "../../utils/types";
import { XIVUserInfo } from "../common/Type";
import { useCharacters } from "./useCharacters";
import { SiteContext } from "./useSiteContext";
import { API_REQUEST_RESULT } from "../../utils/constants";
import { NEW_GEARSET } from "./constants";


const apiUrl = import.meta.env.VITE_SERVER_URL



export const SiteProvider = (props: {children: React.ReactNode}) => {
  const [id, setId] = useState<string | null>(
    localStorage.getItem("id")
  );
  const [userInfo, setUserInfo] = useState<undefined | UserInfo>();
  const isLoggedIn = !!id

  const {
    characters, setCharacters, addCharacter, verifyCharacter, currentlySelectedCharacter, setCurrentlySelectedCharacter
  } = useCharacters(id)

  const saveGearSet = useCallback(async (gearSet: GearSet) => {
    if(!currentlySelectedCharacter) return API_REQUEST_RESULT.FAILURE
    try{
      let res: AxiosResponse
      const newGearSet = {
        id,
        name: gearSet.name,
        job: Number(gearSet.job),
        items: gearSet.items
      
    }
      if(gearSet.id === NEW_GEARSET){
        res = await axios.post(`${apiUrl}/gearset/${currentlySelectedCharacter}`, newGearSet)
        if(res.status === 201){
          const character = characters[currentlySelectedCharacter]
          setCharacters({
            ...characters,
            [currentlySelectedCharacter]: {
              ...character,
              gearSets: [...character.gearSets.filter(gs => gs.id !== NEW_GEARSET), {...gearSet, id: res.data.id}]
            }
          })
        }
      } else {
        res = await axios.patch(`${apiUrl}/gearset/${currentlySelectedCharacter}/${gearSet.id}`, newGearSet, {
          
        })
      }
      return API_REQUEST_RESULT.SUCCESS
    }
    catch(e){
      return e as Error
    }
    
  }, [currentlySelectedCharacter, id, characters, setCharacters])


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
    async (id: string) => {
      if (!currentlySelectedCharacter) return
      const gearSets = characters[currentlySelectedCharacter].gearSets || []
      debugger
      await axios.delete(`${apiUrl}/gearset/${currentlySelectedCharacter}/${id}`)
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
  }, [id, setCharacters, userInfo]);

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
        saveGearSet
      }}
    >
      {props.children}
    </SiteContext.Provider>
  );
};
