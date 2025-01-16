import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Page } from './Components/layout/Page'
import { HomePage } from './Components/home/HomePage'
import { LoginRedirect } from './Components/login/LoginRedirect'
import { LoggedInPage } from './Components/login/LoggedInPage'
import { AddCharacterPage } from './Components/AddCharacter/AddCharacterPage'
import { GearSetList } from './Components/GearSet/GearSetList'
import { SiteProvider } from './Components/context/SiteContext'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <HomePage />,
        path: '/'
      },
      {
        element: <LoginRedirect />,
        path: '/login'
      },
      {
        element: <LoggedInPage />,
        path: '/user'
      }, {
        path: '/add-character',
        element: <AddCharacterPage />
      }, {
        element: <GearSetList />,
        path: '/gear-sets'
      }
    ],
    element: <Page />,
    errorElement: <Page />,
    path: '/'
  }
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
