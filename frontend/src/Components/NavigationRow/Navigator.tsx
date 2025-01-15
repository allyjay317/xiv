
import { Link } from "react-router-dom";
import { Color } from "../../utils/colorSchemes";
import { HEADER_HEIGHT } from "../../utils/constants";
import { Type } from "../common/Type";
import { useSiteContext } from "../SiteContext";
import { LoginButton } from "./LoginButton";
import { NavigationButton } from "./NavigationButton";
import { Button } from "../common/Button";
import { Select } from "../common/Select";



export const Navigator = () => {
  const {userInfo} = useSiteContext()
  const loginURI = import.meta.env.VITE_LOGIN_URI
  
  // return (
  //   <div style={{
  //     display: "flex",
  //     backgroundColor: userInfo?.banner_color || 'white',
  //     width: "100%",
  //     height: HEADER_HEIGHT,
  //     top: 0
  //   }} >
      
  //     <div style={{ flexGrow: 2, justifySelf: "baseline" }}>
  //       <NavigationButton label="Home" type="button" action="/" />
  //     </div>
  //     <div style={{display: 'flex'}}>
  //       <LoginButton loginURI={loginURI} />
  //     </div>
  //   </div>
  // );

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: Color.ui,
        borderBottom: `4px solid ${Color.fg1}`,
        boxSizing: 'border-box',
        display: 'flex',
        gap: '20px',
        height: `${HEADER_HEIGHT}px`,
        justifyContent: 'flex-start',
        padding: '0 20px',
        width: '100%',
      }}
    >
      <Type bold size="L" style={{ flexGrow: 1 }}>
        FFXIV Gear Planner
      </Type>
      <div style={{ display: 'flex' }}>
        <Link style={{ textDecoration: 'none' }} to="/add-character">
          <Button label="Add Character" onClick={() => {}} />
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/">
          <Button label="Gear Sets" />
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/gear-planner">
          <Button label="Gear Planner" onClick={() => {}} />
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/stats">
          <Button label="Stats" onClick={() => {}} />
        </Link>
        <LoginButton loginURI={loginURI} />
      </div>

      
    </div>
  )
};
