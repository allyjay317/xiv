import axios from "axios";
import { CharacterInfo } from "../Components/context/types";
import { XIVUserInfo } from "../Components/common/Type";
import { UserInfo } from "../Components/types";

const apiUrl = import.meta.env.VITE_SERVER_URL;

const baseUrl = `${apiUrl}/user`;

async function getUserInfo(id: string) {
  const res = await axios.get(baseUrl, {
    params: {
      id,
    },
  });
  if (res.status !== 200) {
    throw new Error("Info not retrieved");
  }
  const {
    data: { characters, ...userInfo },
  } = res;
  const newCharacters: Record<string, CharacterInfo> = {};
  (characters as XIVUserInfo[]).forEach((c: XIVUserInfo) => {
    characters[c.id] = {
      info: c,
      gearSets: [],
      verified: true,
    };
  });
  return { characters: newCharacters, userInfo: userInfo as UserInfo };
}

export const users = {
  getUserInfo,
};
