import { Navigator } from './NavigationRow/Navigator'
import { Sidebar } from './Sidebar'
import { PageContent } from './PageContent'

export function Page() {
  return (
    <div style={{ height: '100%', margin: 0, padding: 0, width: '100%' }}>
      <Navigator />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <PageContent />
      </div>
    </div>
  )
}
