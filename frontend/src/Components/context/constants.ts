
import { CharacterInfo, SiteValues } from "./types";

export const defaultValues: SiteValues = {
    isLoggedIn: false,
    userInfo: undefined,
    logOut: () => {},
    logIn: () => {},
    characters: {},
    addCharacter: async () => "",
    updateGearPiece: () => {},
    deleteGearSet: () => {},
    addGearSet: () => {},
    currentlySelectedCharacter: undefined,
    updateGearSet: () => {},
    setCurrentlySelectedCharacter: () => {},
    verifyCharacter: () => {}
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