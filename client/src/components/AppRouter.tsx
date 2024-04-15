import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../utils/routes'
import { useStore } from './StoreContext'

export const AppRouter = () => {
  const { store } = useStore()
  const userData = store?.userStore

  if (!userData?.user) return null

  console.log('User', userData.user.name)

  return (
    <Routes>
      {userData?.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route element={<Component />} path={path} key={path} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route element={<Component />} path={path} key={path} />
      ))}
    </Routes>
  )
}
