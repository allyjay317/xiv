import { CharacterPanel } from "./CharacterPanel"
import { Type } from "../common/Type"
import { useSiteContext } from "../context/useSiteContext"



export const UserPage = () => {
    const {userInfo} = useSiteContext()

    return userInfo ? (
    <div>
        <Type size="M">Welcome {userInfo.username}</Type>
        <Type size="L">Characters</Type>
        <CharacterPanel />
    </div>) : <></>
}