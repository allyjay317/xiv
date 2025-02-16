import { API_REQUEST_RESULT } from '../../utils/constants'
import { GearPiece, GearSet, Slot } from '../../utils/types'
import { XIVUserInfo } from '../common/Type'
import { UserInfo } from '../types'

export type CharacterInfo = {
  info: XIVUserInfo
  gearSets: GearSet[]
  verified: boolean
}

export type SiteValues = {
  isLoggedIn: boolean
  userInfo?: UserInfo
  logOut: () => void
  logIn: (id: string) => void
  avatar?: string
  characters: Record<string, CharacterInfo>
  addCharacter: (newId: string) => Promise<API_REQUEST_RESULT | Error>
  updateGearPiece: ({
    id,
    slot,
    value,
  }: {
    id: string
    slot: Slot
    value: GearPiece
  }) => void
  addGearSet: (gearSet: GearSet) => void
  deleteGearSet: (id: string) => void
  selectedCharacter: string | undefined
  updateGearSet: (gearSet: GearSet) => void
  setselectedCharacter: (id: string) => void
  verifyCharacter: (
    lodestoneId: string,
    verifyPhrase: string,
  ) => Promise<API_REQUEST_RESULT | Error>
  saveGearSet: (
    gearSet: GearSet,
    cId?: string,
  ) => Promise<API_REQUEST_RESULT | Error>
  deleteCharacter: (characterId: number) => Promise<API_REQUEST_RESULT | Error>
  updateCharacter: (characterId: number) => Promise<API_REQUEST_RESULT | Error>
  saveGearSets: (newGearSets: GearSet[]) => Promise<API_REQUEST_RESULT | Error>
  modifiedGearSets: boolean
}
