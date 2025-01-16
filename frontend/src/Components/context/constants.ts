import { DataCenter, Gender, Server } from "../../utils/types";
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
  };

  export const testUser: CharacterInfo = {
    gearSets: [],
    info: {
      Avatar: '',
      Bio: '',
      DC: DataCenter.CRYSTAL,
      Gender: Gender.FEMALE,
      ID: 11196593,
      Name: 'Alysonna Kilgannon',
      Portrait: '',
      Server: Server.MATEUS,
      Title: {
        ID: 1,
        Icon: '',
        Name_de: '',
        Name_en: '',
        Name_fr: '',
        Name_ja: '',
      },
      TitleTop: true,
    }
}