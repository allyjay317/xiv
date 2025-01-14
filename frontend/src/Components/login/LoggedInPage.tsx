import { useSiteContext } from "../SiteContext"



export const LoggedInPage = () => {
    const {userInfo} = useSiteContext()

    return userInfo ? (
    <div>
        <div>Welcome {userInfo.username}</div>
    </div>) : <></>
}