import { RootStore } from '@/store/RootStore'
import { createContext, useContext } from 'react'

export const StoreContext = createContext<{
  store: RootStore
} | null>(null)

export const useStore = () => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('')
  }

  return context
}
