import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Page } from './Components/layout/Page'
import { HomePage } from './Components/home/HomePage'
import { LoginRedirect } from './Components/login/LoginRedirect'
import { GearSetList } from './Components/GearSet/GearSetList'
import { SiteProvider } from './Components/context/SiteContext'
import { UserPage } from './Components/User/UserPage'
import { StatsPage } from './Components/Stats/StatsPage'
import { GearPlannerPage } from './Components/gear-planner/GearPlannerPage'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <HomePage />,
        path: '/',
      },
      {
        element: <UserPage />,
        path: '/user',
      },
      {
        element: <GearSetList />,
        path: '/gear-sets',
      },
      {
        element: <GearPlannerPage />,
        path: '/gear-planner',
      },
      {
        element: <StatsPage />,
        path: '/stats',
      },
    ],
    element: <Page />,
    errorElement: <Page />,
    path: '/',
  },
  {
    element: <LoginRedirect />,
    path: '/login',
  },
  {
    element: <div>ERROR hi</div>,
    path: '/error',
  },
])

export function App() {
  return (
    <>
      <SiteProvider>
        <RouterProvider router={router} />
      </SiteProvider>
    </>
  )
}
