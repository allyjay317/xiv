import axios from "axios";
import { XIVUserInfo } from "../Components/common/Type";

const apiUrl = import.meta.env.VITE_SERVER_URL

const baseUrl = `${apiUrl}/character`

async function searchCharacter(userId: string, lodestone_id: string){
    const res = await axios.post(baseUrl, {
        id: userId,
        lodestone_id
      })
    if(res.status !== 200){
        throw new Error("Character info not retrieved")
    }
    const {data} = res
    if(data.avatar && data.id && data.name && data.portrait){
        return data as XIVUserInfo
    }
    throw new Error("Something went wrong")
}

async function checkVerification({lodestone_id, id, verify_code}: {lodestone_id: string, id: string, verify_code: string}){
    const res = await axios.post(`${apiUrl}/character/verify`, {
        lodestone_id,
        id,
        verify_code
      })
    if(res.status !== 202){
        throw new Error("Character Not Verified")
    }
}

export const characters = {
    searchCharacter,
    checkVerification
}