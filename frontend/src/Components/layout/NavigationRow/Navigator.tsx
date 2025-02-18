import { useNavigate } from 'react-router-dom'
import { Color } from '../../../utils/colorSchemes'
import { HEADER_HEIGHT } from '../../../utils/constants'
import { Type } from '../../common/Type'
import { LoginButton } from './LoginButton'
import { Button } from '../../common/Button'
import { useSiteContext } from '../../context/useSiteContext'
import { useMediaQuery } from '@react-hook/media-query'

export const Navigator = () => {
  const loginURI = import.meta.env.VITE_LOGIN_URI
  const { isLoggedIn } = useSiteContext()
  const navigate = useNavigate()
  const query = useMediaQuery('only screen and (min-width: 1020px)')
  const dev = localStorage.getItem('dev')

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
        width: '100vw',
      }}
    >
      <Type
        bold
        size={!query ? 'S' : 'L'}
        inline
        style={{ flexGrow: 1, textAlign: 'left' }}
      >
        FFXIV Gear Planner
      </Type>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {isLoggedIn && (
          <>
            <Button label="Gear Sets" onClick={() => navigate('/gear-sets')} />
            {dev === 'true' && (
              <Button
                label="Gear Planner"
                onClick={() => navigate('gear-planner')}
              />
            )}
            <Button
              label="Stats"
              onClick={() => {
                navigate('/stats')
              }}
            />
          </>
        )}
        <LoginButton loginURI={loginURI} size="XL" />
      </div>
    </div>
  )
}
