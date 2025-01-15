import { Button } from "../common/Button";
import { useSiteContext } from "../SiteContext";
import { NavigationButton } from "./NavigationButton";

export function LoginButton({loginURI}: {loginURI: string}){
    const {isLoggedIn, logOut, userInfo} = useSiteContext()
    return isLoggedIn && userInfo ? (
      <>
        <NavigationButton action="/user" label="User Page"  type="icon" src={`https://cdn.discordapp.com/avatars/${userInfo.discord_id}/${userInfo.avatar}`} color={userInfo.accent_color} />
        <Button
          onClick={logOut}
          label="logout"
        />
      </>
    ) : (
      <>
          <Button label="Login" onClick={() => {
            window.open(loginURI, '_self');
          }} />
      </>
    )
}

