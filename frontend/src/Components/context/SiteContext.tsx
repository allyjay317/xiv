import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { UserInfo } from '../types'
import { GearPiece, GearSet, Slot } from '../../utils/types'
import { useCharacters } from './useCharacters'
import { SiteContext } from './useSiteContext'
import { API_REQUEST_RESULT } from '../../utils/constants'
import { NEW_GEARSET } from './constants'
import { gearsets } from '../../api/gearset'
import { users } from '../../api/user'

export const SiteProvider = (props: { children: React.ReactNode }) => {
  const [id, setId] = useState<string | null>(localStorage.getItem('id'))
  const [userInfo, setUserInfo] = useState<undefined | UserInfo>()
  const isLoggedIn = !!id

  const {
    characters,
    setCharacters,
    addCharacter,
    verifyCharacter,
    selectedCharacter,
    setselectedCharacter,
    loadCharacters,
    deleteCharacter,
    updateCharacter,
  } = useCharacters(id)

  const hasUnsavedGearSets = useMemo(() => {
    let hasUnsaved = false
    Object.values(characters).forEach((c) => {
      c.gearSets.forEach((gs) => {
        hasUnsaved = hasUnsaved || gs.modified
      })
    })
    return hasUnsaved
  }, [characters])

  const saveGearSet = useCallback(
    async (gearSet: GearSet, cId?: string) => {
      if (!selectedCharacter) return API_REQUEST_RESULT.FAILURE
      if (!id) return API_REQUEST_RESULT.NOT_LOGGED_IN
      try {
        const newGearSet = {
          user_id: id,
          name: gearSet.name,
          job: Number(gearSet.job),
          items: gearSet.items,
          index: 0,
        }

        const characterId = cId ?? selectedCharacter
        const character = characters[characterId]
        const gearSets = character.gearSets.filter((gs) => gs.id !== gearSet.id)

        if (gearSet.id.startsWith(NEW_GEARSET)) {
          const { id: gsId } = await gearsets.createGearSet(
            characterId,
            newGearSet,
          )
          gearSet.id = gsId
          gearSets.push({ ...gearSet, modified: false })
        } else {
          await gearsets.updateGearSet(characterId, gearSet.id, newGearSet)
          gearSets.push({ ...gearSet, modified: false })
        }

        setCharacters({
          ...characters,
          [characterId]: {
            ...character,
            gearSets,
          },
        })
        return API_REQUEST_RESULT.SUCCESS
      } catch (e) {
        return e as Error
      }
    },
    [selectedCharacter, id, characters, setCharacters],
  )

  const saveGearSets = useCallback(
    async (newGearSets: GearSet[]) => {
      if (!selectedCharacter || !id) return API_REQUEST_RESULT.NOT_LOGGED_IN
      let gearSets = characters[selectedCharacter].gearSets
      if (newGearSets.length) {
        const gsPromises: Promise<GearSet>[] = []
        newGearSets.forEach((gs, i) => {
          gsPromises.push(
            new Promise((resolve, reject) => {
              gearsets
                .createGearSet(selectedCharacter, {
                  user_id: id,
                  name: gs.name,
                  job: Number(gs.job),
                  items: gs.items,
                  index: gearSets.length + i,
                })
                .then(({ id: gsId }) => {
                  resolve({ ...gs, id: gsId })
                })
                .catch(reject)
            }),
          )
        })
        const resolvedSets = await Promise.all(gsPromises)
        gearSets = [...gearSets, ...resolvedSets]
      }
      await gearsets.bulkUpdateGearSets(
        selectedCharacter,
        gearSets.map((gs, i) => ({
          user_id: id,
          name: gs.name,
          job: Number(gs.job),
          items: gs.items,
          index: i,
          id: gs.id,
        })),
      )
      setCharacters({
        ...characters,
        [selectedCharacter]: {
          ...characters[selectedCharacter],
          gearSets: gearSets.map((gs) => ({ ...gs, modified: false })),
        },
      })
      return API_REQUEST_RESULT.SUCCESS
    },
    [characters],
  )

  const addGearSet = useCallback(
    (gearSet: GearSet) => {
      if (!selectedCharacter) return
      const gearSets = characters[selectedCharacter].gearSets || []
      setCharacters({
        ...characters,
        [selectedCharacter]: {
          ...characters[selectedCharacter],
          gearSets: [...gearSets, gearSet],
        },
      })
    },
    [characters, selectedCharacter, setCharacters],
  )

  const deleteGearSet = useCallback(
    async (id: string) => {
      if (!selectedCharacter) return
      const gearSets = characters[selectedCharacter].gearSets || []
      try {
        await gearsets.deleteGearSet(selectedCharacter, id)
        setCharacters({
          ...characters,
          [selectedCharacter]: {
            ...characters[selectedCharacter],
            gearSets: gearSets.filter((gs) => gs.id !== id),
          },
        })
      } catch (e) {
        return API_REQUEST_RESULT.FAILURE
      }
    },
    [characters, selectedCharacter, setCharacters],
  )

  const updateGearSet = useCallback(
    (gearSet: GearSet) => {
      if (!selectedCharacter) return
      const gearSets = characters[selectedCharacter].gearSets || []
      setCharacters({
        ...characters,
        [selectedCharacter]: {
          ...characters[selectedCharacter],
          gearSets: gearSets.map((gs) => {
            if (gs.id === gearSet.id) {
              return { ...gearSet, modified: true }
            }
            return gs
          }),
        },
      })
    },
    [characters, selectedCharacter, setCharacters],
  )

  const updateGearPiece = useCallback(
    ({ id, slot, value }: { id: string; slot: Slot; value: GearPiece }) => {
      if (!selectedCharacter) return
      const gearSets = characters[selectedCharacter].gearSets || []
      const gearSetValue = gearSets.find((gs) => gs.id === id)
      if (!gearSetValue) {
        return
      }
      const newGearSet: GearSet = {
        ...gearSetValue,
        items: { ...gearSetValue.items, [slot]: value },
      }
      updateGearSet(newGearSet)
    },
    [characters, selectedCharacter, updateGearSet],
  )

  useEffect(() => {
    if (id && !userInfo) {
      users
        .getUserInfo(id)
        .then((data) => {
          setUserInfo(data.userInfo)
          loadCharacters(data.characters)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [id, setCharacters, userInfo])

  const logOut = () => {
    localStorage.removeItem('id')
    setUserInfo(undefined)
    setselectedCharacter(undefined)
    setCharacters({})
    setId(null)
  }

  const logIn = (id: string) => {
    localStorage.setItem('id', id)
    setId(id)
  }

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
        selectedCharacter,
        updateGearSet,
        setselectedCharacter: (id: string) => {
          setselectedCharacter(id)
        },
        saveGearSet,
        deleteCharacter,
        updateCharacter,
        saveGearSets,
        modifiedGearSets: hasUnsavedGearSets,
      }}
    >
      {props.children}
    </SiteContext.Provider>
  )
}
