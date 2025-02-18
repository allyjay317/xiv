import { Navigator } from './NavigationRow/Navigator'
import { Sidebar } from './Sidebar'
import { PageContent } from './PageContent'
import { useMediaQuery } from '@react-hook/media-query'
import { useEffect, useState } from 'react'
import { Button } from '../common/Button'
import { SIDEBAR_WIDTH } from '../../utils/constants'

export function Page() {
  const query = useMediaQuery('only screen and (min-width: 1020px)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(query)

  useEffect(() => {
    if (!query && isSidebarOpen) setIsSidebarOpen(false)
    else if (query && !isSidebarOpen) setIsSidebarOpen(true)
  }, [query])

  return (
    <div style={{ margin: 0, padding: 0, width: '100vw' }}>
      <Navigator />
      <div style={{ display: 'flex', position: 'relative' }}>
        <div
          style={{
            width: isSidebarOpen ? SIDEBAR_WIDTH : 0,
            transition: 'width .25s ease-in-out',
          }}
        >
          <Sidebar />
        </div>
        <div
          style={{
            position: 'absolute',
            zIndex: 999,
          }}
        >
          <Button
            label={isSidebarOpen ? '<' : '>'}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ zIndex: 99999 }}
            size="XS"
          />
        </div>
        <PageContent sidebarOpen={isSidebarOpen} />
      </div>
    </div>
  )
}
