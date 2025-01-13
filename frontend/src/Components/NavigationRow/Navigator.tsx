import { useSiteContext } from "../SiteContext";
import { NavigationButton } from "./NavigationButton";


export const Navigator = () => {
  const {isLoggedIn, logOut, userInfo} = useSiteContext()
  const loginURI = import.meta.env.VITE_LOGIN_URI

  return (
    <div style={{ display: "flex", backgroundColor: userInfo?.banner_color || 'white' }}>
      <div style={{ flexGrow: 2, justifySelf: "baseline" }}>
        <NavigationButton label="Home" type="button" action="/" />
      </div>
      <div>
        {isLoggedIn ? (
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
        )}
      </div>
    </div>
  );
};
