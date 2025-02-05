import { Link } from 'react-router-dom'
import { Color } from '../../../utils/colorSchemes'
import { HEADER_HEIGHT } from '../../../utils/constants'
import { Type } from '../../common/Type'
import { LoginButton } from './LoginButton'
import { Button } from '../../common/Button'
import { useSiteContext } from '../../context/useSiteContext'

export const Navigator = () => {
  const loginURI = import.meta.env.VITE_LOGIN_URI
  const { isLoggedIn } = useSiteContext()

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
      <Type bold size="L" inline style={{ flexGrow: 1, textAlign: 'left' }}>
        FFXIV Gear Planner
      </Type>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {isLoggedIn && (
          <>
            {' '}
            <Link style={{ textDecoration: 'none' }} to="/gear-sets">
              <Button label="Gear Sets" />
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/gear-planner">
              <Button label="Gear Planner" onClick={() => {}} />
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/stats">
              <Button label="Stats" onClick={() => {}} />
            </Link>
          </>
        )}
        <LoginButton loginURI={loginURI} />
      </div>
    </div>
  )
}
