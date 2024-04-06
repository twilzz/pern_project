import { cn } from '@/lib/utils'
import { authRoutes, publicRoutes } from '@/utils/routes'
import { Link, useLocation } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu'

export const NavBar = () => {
  const location = useLocation()
  return (
    <nav className="w-full bg-slate-200">
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
          {authRoutes.map((route) => (
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
    </nav>
  )
}
