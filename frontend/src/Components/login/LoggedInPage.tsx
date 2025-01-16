import { Type } from "../common/Type"
import { useSiteContext } from "../context/SiteContext"



export const LoggedInPage = () => {
    const {userInfo} = useSiteContext()

    return userInfo ? (
    <div>
        <Type size="M">Welcome {userInfo.username}</Type>
    </div>) : <></>
}