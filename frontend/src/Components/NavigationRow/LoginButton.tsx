import { useSiteContext } from "../SiteContext";
import { NavigationButton } from "./NavigationButton";

export function LoginButton({loginURI}: {loginURI: string}){
    const {isLoggedIn, logOut} = useSiteContext()
    return isLoggedIn ? (
        <>
          <NavigationButton action="/user" type="button" label="User Page" />
          <NavigationButton
            action={logOut}
            type="button"
            label="logout"
          />
        </>
      ) : (
        <>
          <NavigationButton
            action={loginURI}
            type="anchor"
            label="Log in with Discord"
          />
        </>
      )
}

