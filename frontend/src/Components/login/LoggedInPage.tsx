import { Type } from "../common/Type"
import { useSiteContext } from "../context/useSiteContext"



export const LoggedInPage = () => {
    const {userInfo} = useSiteContext()

    return userInfo ? (
    <div>
        <Type size="M">Welcome {userInfo.username}</Type>
    </div>) : <></>
}