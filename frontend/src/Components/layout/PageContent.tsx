import { Outlet } from "react-router-dom";
import { Color } from "../../utils/colorSchemes";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../utils/constants";

export function PageContent(){
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