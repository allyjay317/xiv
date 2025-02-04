import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Color } from "../../utils/colorSchemes";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../utils/constants";
import { useSiteContext } from "../context/useSiteContext";
import { useEffect } from "react";

export function PageContent(){

    const {isLoggedIn} = useSiteContext()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      if(!isLoggedIn && location.pathname !== '/'){
        navigate('/')
      }
    }, [location.pathname, isLoggedIn])

    return (
        <div
          style={{
            backgroundColor: Color.ui,
            boxSizing: 'border-box',
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflow: 'auto',
            padding: '15px',
            width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
          }}
        >
          <Outlet />
        </div>
    )
}