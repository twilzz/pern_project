import { PageNotFound } from '@/pages/PageNotFound'
import { observer } from 'mobx-react-lite'
import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes, userRoutes } from '../utils/routes'
import { useStore } from './StoreContext'

export const AppRouter = observer(() => {
  const { store } = useStore()
  const userData = store?.userStore

  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
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
