import { createContext, useContext } from 'react'
import UserStore from '../store/UserStore'

export const UserStoreContext = createContext<UserStore | null>(null)

export const useStore = () => {
  const context = useContext(UserStoreContext)

  if (!context) {
    throw new Error('')
  }

  return context
}
