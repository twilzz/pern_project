import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../utils/routes'
import { useStore } from './StoreContext'

export const AppRouter = () => {
  const { user } = useStore()

  if (!user) return null

  return (
    <Router>
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

      <div className="absolute flex">
        <div className="border p-2 hover:bg-slate-300">
          <Link to="/">Shop</Link>
        </div>
        <div className="border p-2 hover:bg-slate-300">
          <Link to="admin">Admin</Link>
        </div>
        <div className="border p-2 hover:bg-slate-300">
          <Link to="auth">Auth</Link>
        </div>
        <div className="border p-2 hover:bg-slate-300">
          <Link to="auth">Auth</Link>
        </div>
        <div className="border p-2 hover:bg-slate-300">
          <Link to="device">Device</Link>
        </div>
        <div className="border p-2 hover:bg-slate-300">
          <Link to="basket">Basket</Link>
        </div>
      </div>
    </Router>
  )
}
