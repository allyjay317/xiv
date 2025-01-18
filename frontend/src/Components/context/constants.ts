
import { API_REQUEST_RESULT } from "../../utils/constants";
import { CharacterInfo, SiteValues } from "./types";

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
    currentlySelectedCharacter: undefined,
    updateGearSet: () => {},
    setCurrentlySelectedCharacter: () => {},
    verifyCharacter: async () => API_REQUEST_RESULT.SUCCESS
  };

  export const testUser: CharacterInfo = {
    gearSets: [],
    info: {
      avatar: '',
      id: 11196593,
      name: 'Alysonna Kilgannon',
      portrait: '',
    },
    verified: false
}