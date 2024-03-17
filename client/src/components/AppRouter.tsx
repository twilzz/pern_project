import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../utils/routes'
import { useStore } from './StoreContext'

export const AppRouter = () => {
  const { isAuth } = useStore()
  return (
    <Router>
      <Routes>
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route element={<Component />} path={path} />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route element={<Component />} path={path} />
        ))}
        {/* <Navigate to={ROUTES.SHOP} /> */}
      </Routes>

      <div>
        <ul>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="admin">Admin</Link>
          </li>
          <li>
            <Link to="auth">Auth</Link>
          </li>
          <li>
            <Link to="device">Device</Link>
          </li>
          <li>
            <Link to="basket">Basket</Link>
          </li>
        </ul>
      </div>
    </Router>
  )
}
