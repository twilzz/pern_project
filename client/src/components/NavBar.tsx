import { cn } from '@/lib/utils'
import { authRoutes, publicRoutes } from '@/utils/routes'
import { observer } from 'mobx-react-lite'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from './StoreContext'
import { UserMenu } from './UserMenu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu'

export const NavBar = observer(() => {
  const {
    store: {
      userStore: { isAuth },
    },
  } = useStore()

  const location = useLocation()
  return (
    <nav className="w-full pr-4 bg-slate-200 flex justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          {publicRoutes.map((route) => (
            <NavigationMenuItem
              key={route.path}
              className={cn(
                'hover:bg-slate-300 p-2 clsx',
                route.path === location.pathname && 'bg-slate-300'
              )}
            >
              <Link to={route.path}>{route.name}</Link>
            </NavigationMenuItem>
          ))}
          {isAuth &&
            authRoutes.map((route) => (
              <NavigationMenuItem
                key={route.path}
                className={cn(
                  'hover:bg-slate-300 p-2 clsx',
                  route.path === location.pathname && 'bg-slate-300'
                )}
              >
                <Link to={route.path}>{route.name}</Link>
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2">
        {!isAuth && <span>Please login or register</span>}
        <UserMenu />
      </div>
    </nav>
  )
})
