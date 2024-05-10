import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes, userRoutes } from '../utils/routes'
import { useStore } from './StoreContext'
import { observer } from 'mobx-react-lite'

export const AppRouter = observer(() => {
  const { store } = useStore()
  const userData = store?.userStore

  console.log('ROTER', userData.isAuth);
  

  return (
    <Routes>
      {userData?.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route element={<Component />} path={path} key={path} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route element={<Component />} path={path} key={path} />
      ))}
      {userRoutes.map(({ path, Component }) => (
        <Route element={<Component />} path={path} key={path} />
      ))}
    </Routes>
  )
})
