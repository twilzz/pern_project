import { AdminPage } from '../pages/AdminPage'
import { AuthPage } from '../pages/AuthPage'
import { BasketPage } from '../pages/BasketPage'
import { ShopPage } from '../pages/ShopPage'
import { ROUTES } from './constants'

export const authRoutes = [
  { path: ROUTES.ADMIN, Component: AdminPage },
  { path: ROUTES.BASKET, Component: BasketPage },
]

export const publicRoutes = [
  { path: ROUTES.SHOP, Component: ShopPage },
  { path: ROUTES.REGISTRATION, Component: AuthPage },
  { path: ROUTES.LOGIN, Component: AuthPage },
  { path: ROUTES.DEVICE + '/:id', Component: AdminPage },
]
