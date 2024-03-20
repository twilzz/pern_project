import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../utils/routes'
import { useStore } from './StoreContext'

export const AppRouter = () => {
  const { user } = useStore()

  if (!user) return null

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route element={<Component />} path={path} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route element={<Component />} path={path} />
      ))}
      {/* <Navigate to={ROUTES.SHOP} /> */}
    </Routes>
  )
}
