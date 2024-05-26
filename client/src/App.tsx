import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { getAllBrands, getAllDevices, getAllTypes } from './api/deviceApi'
import { checkUser } from './api/userApi'
import { AppRouter } from './components/AppRouter'
import { NavBar } from './components/NavBar'
import { useStore } from './components/StoreContext'

export const App = observer(() => {
  const {
    store: { userStore, deviceStore },
  } = useStore()

  useEffect(() => {
    checkUser().then((data) => {
      userStore.setIsAuth(true)
      userStore.setUser(data)
    })
    getAllTypes().then((data) => deviceStore.setTypes(data))
    getAllBrands().then((data) => deviceStore.setBrands(data))
    getAllDevices().then((data) => deviceStore.setDevices(data))
  }, [])

  return (
    <div>
      <NavBar />
      <AppRouter />
    </div>
  )
})
