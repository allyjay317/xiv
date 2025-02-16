import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Color } from '../../utils/colorSchemes'
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../../utils/constants'
import { useSiteContext } from '../context/useSiteContext'
import { useEffect, useState } from 'react'

export function PageContent({ sidebarOpen }: { sidebarOpen: boolean }) {
  const { isLoggedIn } = useSiteContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [resizing, setResizing] = useState(false)

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/') {
      navigate('/')
    }
  }, [location.pathname, isLoggedIn])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    function resizeListener() {
      if (timeout) {
        clearTimeout(timeout)
      } else setResizing(true)
      timeout = setTimeout(() => {
        setResizing(false)
      }, 1000)
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return (
    <div
      style={{
        backgroundColor: Color.ui,
        boxSizing: 'border-box',
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        scrollBehavior: 'unset',
        overflow: 'auto',
        padding: '15px',
        width: !sidebarOpen ? '100%' : `calc(100vw - ${SIDEBAR_WIDTH}px)`,
        transition: !sidebarOpen || resizing ? 'none' : 'width .5s ease-in-out',
      }}
    >
      <Outlet />
    </div>
  )
}
