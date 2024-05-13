import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { checkUser } from './api/userApi'
import { AppRouter } from './components/AppRouter'
import { NavBar } from './components/NavBar'
import { useStore } from './components/StoreContext'

export const App = observer(() => {
  const {
    store: { userStore },
  } = useStore()

  useEffect(() => {
    checkUser().then((data) => {
      userStore.setIsAuth(true)
      userStore.setUser(data)
    })
  })

  return (
    <div>
      <NavBar />
      <AppRouter />
    </div>
  )
})
