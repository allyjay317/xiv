import { GearPiece, GearSet, Slot } from "../../utils/types";
import { XIVUserInfo } from "../common/Type";
import { UserInfo } from "../types";

export type CharacterInfo = { info: XIVUserInfo; gearSets: GearSet[] }

export type SiteValues = {
  isLoggedIn: boolean;
  userInfo?: UserInfo;
  logOut: () => void;
  logIn: (discordInfo: any) => void;
  avatar?: string
  characters: Record<string, CharacterInfo>
  addCharacter: (id: string) => Promise<Error | string>
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
  currentlySelectedCharacter: string | undefined
  updateGearSet: (gearSet: GearSet) => void
  setCurrentlySelectedCharacter: (id: string) => void
};

