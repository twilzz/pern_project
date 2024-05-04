import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ROUTES } from '@/utils/constants'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from './StoreContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const UserMenu = observer(() => {
  const {
    store: {
      userStore: { setIsAuth, setUser, user, isAuth },
    },
  } = useStore()

  const currentUser = user

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <DropdownMenu open={menuIsOpen} onOpenChange={() => setMenuIsOpen(false)}>
        <DropdownMenuTrigger asChild>
          <Avatar
            onClick={() => setMenuIsOpen(true)}
            className="cursor-pointer"
          >
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback>
              {getInitialsFromName(currentUser?.name ?? 'Unknown User')}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            {isAuth
              ? currentUser?.name
                ? currentUser?.name
                : 'Unnamed user'
              : 'Unregistered user'}
          </DropdownMenuLabel>
          {isAuth ? (
            <>
              <DropdownMenuItem
                onSelect={() => navigate(ROUTES.USER)}
                className="cursor-pointer"
              >
                Edit user
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setIsAuth(false)
                  setUser(null)
                }}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => navigate(ROUTES.REGISTRATION)}
              >
                Create Account
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => navigate(ROUTES.LOGIN)}
                className="cursor-pointer"
              >
                Login
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
})

function getInitialsFromName(name: string) {
  const separatedName = name.split(' ')
  const initials = separatedName.map((word) => word.split('')[0])
  return initials.join('')
}
