import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const UserMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      <DropdownMenu open={menuIsOpen} onOpenChange={() => setMenuIsOpen(false)}>
        <DropdownMenuTrigger asChild>
          <Avatar onClick={() => setMenuIsOpen(true)}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>User</DropdownMenuLabel>
          <DropdownMenuItem>Create Account</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate('/login')}>
            Login
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
