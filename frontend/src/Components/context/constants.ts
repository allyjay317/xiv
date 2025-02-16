import { API_REQUEST_RESULT } from '../../utils/constants'
import { CharacterInfo, SiteValues } from './types'

export const defaultValues: SiteValues = {
  isLoggedIn: false,
  userInfo: undefined,
  logOut: () => {},
  logIn: () => {},
  characters: {},
  addCharacter: async () => API_REQUEST_RESULT.SUCCESS,
  updateGearPiece: () => {},
  deleteGearSet: () => {},
  addGearSet: () => {},
  selectedCharacter: undefined,
  updateGearSet: () => {},
  setselectedCharacter: () => {},
  verifyCharacter: async () => API_REQUEST_RESULT.SUCCESS,
  saveGearSet: async () => API_REQUEST_RESULT.SUCCESS,
  deleteCharacter: async () => API_REQUEST_RESULT.SUCCESS,
  updateCharacter: async () => API_REQUEST_RESULT.SUCCESS,
  saveGearSets: async () => API_REQUEST_RESULT.SUCCESS,
  modifiedGearSets: false
}

export const testUser: CharacterInfo = {
  gearSets: [],
  info: {
    avatar: '',
    id: 11196593,
    name: 'Alysonna Kilgannon',
    portrait: '',
  },
  verified: false,
}

export const NEW_GEARSET = 'NEW'
