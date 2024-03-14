import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AdminPage } from './pages/AdminPage'
import { AuthPage } from './pages/AuthPage'
import { BasketPage } from './pages/BasketPage'
import { DevicePage } from './pages/DevicePage'
import { ShopPage } from './pages/ShopPage'
export const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<ShopPage />} />
                    <Route path="admin" element={<AdminPage />} />
                    <Route path="auth" element={<AuthPage />} />
                    <Route path="device" element={<DevicePage />} />
                    <Route path="basket" element={<BasketPage />} />
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
        </div>
    )
}
