import { AdminPage } from '../pages/AdminPage'
import { AuthPage } from '../pages/AuthPage'
import { BasketPage } from '../pages/BasketPage'
import { ShopPage } from '../pages/ShopPage'
import { ROUTES } from './constants'

export const authRoutes = [
  { path: ROUTES.ADMIN, Component: AdminPage, name: 'Admin' },
  { path: ROUTES.BASKET, Component: BasketPage, name: 'Basket' },
]

export const publicRoutes = [
  { path: ROUTES.SHOP, Component: ShopPage, name: 'Main' },
  { path: ROUTES.REGISTRATION, Component: AuthPage, name: 'Registration' },
  { path: ROUTES.LOGIN, Component: AuthPage, name: 'Login' },
  { path: ROUTES.DEVICE + '/:id', Component: AdminPage, name: 'Devices' },
]
