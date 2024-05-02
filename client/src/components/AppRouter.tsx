import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes, userRoutes } from '../utils/routes'
import { useStore } from './StoreContext'

export const AppRouter = () => {
  const { store } = useStore()
  const userData = store?.userStore

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
}
