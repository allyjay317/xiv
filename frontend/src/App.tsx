import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Page } from './Components/layout/Page'
import { HomePage } from './Components/home/HomePage'
import { LoginRedirect } from './Components/login/LoginRedirect'
import { GearSetList } from './Components/GearSet/GearSetList'
import { SiteProvider } from './Components/context/SiteContext'
import { UserPage } from './Components/User/UserPage'
import { StatsPage } from './Components/Stats/StatsPage'

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
