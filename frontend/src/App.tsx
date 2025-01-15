import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Page } from './Components/layout/Page'
import { HomePage } from './Components/home/HomePage'
import { LoginRedirect } from './Components/login/LoginRedirect'
import { LoggedInPage } from './Components/login/LoggedInPage'

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
      <RouterProvider router={router} />
    </>
  )
}
