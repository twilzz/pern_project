import { createContext, useContext } from 'react'
import DeviceStore from '../store/DeviceStore'
import UserStore from '../store/UserStore'

export const UserStoreContext = createContext<{
  user: UserStore | null
  devices: DeviceStore | null
} | null>(null)

export const useStore = () => {
  const context = useContext(UserStoreContext)

  if (!context) {
    throw new Error('')
  }

  return context
}
