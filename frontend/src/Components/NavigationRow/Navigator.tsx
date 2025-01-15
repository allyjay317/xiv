
import { useSiteContext } from "../SiteContext";
import { NavigationButton } from "./NavigationButton";
import { userInfo } from "os";



export const Navigator = () => {
  const {isLoggedIn, logOut, userInfo} = useSiteContext()
  const loginURI = import.meta.env.VITE_LOGIN_URI
  
  return (
    <div style={{
      display: "flex",
      backgroundColor: userInfo?.accent_color || 'white',
      width: "100%",
      position: 'absolute',
      top: 0
    }} >
      
      <div style={{ flexGrow: 2, justifySelf: "baseline" }}>
        <NavigationButton label="Home" type="button" action="/" />
      </div>
      <div style={{display: 'flex'}}>
        {isLoggedIn && userInfo ? (
          <>
            <NavigationButton action="/user" label="User Page"  type="icon" src={`https://cdn.discordapp.com/avatars/${userInfo.discord_id}/${userInfo.avatar}`}/>
            <NavigationButton
              action={logOut}
              type='button'
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
