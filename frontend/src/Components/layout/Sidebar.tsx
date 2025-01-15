import { Color } from "../../utils/colorSchemes";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../utils/constants";

export function SideBar(){
    return <div
    style={{
      backgroundColor: Color.ui,
      borderRight: `4px solid ${Color.fg1}`,
      boxSizing: 'border-box',
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: '15px 0',
      textAlign: 'center',
      width: `${SIDEBAR_WIDTH}px`,
    }}
  ></div>
}