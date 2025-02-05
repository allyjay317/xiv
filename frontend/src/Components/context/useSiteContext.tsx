import React, { useContext } from 'react'
import { defaultValues } from './constants'

export const SiteContext = React.createContext(defaultValues)

export const useSiteContext = () => {
  const context = useContext(SiteContext)
  return context
}
