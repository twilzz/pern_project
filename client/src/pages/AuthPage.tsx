import { login, registration } from '@/api/userApi'
import { useStore } from '@/components/StoreContext'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ROUTES } from '@/utils/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'

// Minimum 4 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/
)

const authSchema = z.object({
  email: z.string().min(4, {
    message: 'Username must be at least 4 character',
  }),
  password: z.string().min(4).regex(passwordValidation, {
    message:
      'Minimum 4 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  }),
})

export const AuthPage = observer(() => {
  const {
    store: {
      userStore: { setIsAuth, setUser, isAuth },
    },
  } = useStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isRegisterForm = pathname === ROUTES.REGISTRATION

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [formError, setFormError] = useState(null)

  const signIn = async (email: string, password: string) => {
    try {
      const response = await registration(email, password)
      setUser(response)
      setIsAuth(true)
      navigate(ROUTES.SHOP)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message
        setFormError(message)
      }
    }
  }

  const logIn = async (email: string, password: string) => {
    try {
      const response = await login(email, password)
      setUser(response)
      setIsAuth(true)
      navigate(ROUTES.SHOP)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message
        setFormError(message)
      }
    }
  }

  function onSubmit(values: z.infer<typeof authSchema>) {
    isRegisterForm
      ? signIn(values.email, values.password)
      : logIn(values.email, values.password)
  }

  return (
    <div className="w-full flex items-center justify-center pt-8">
      <div className="w-[400px] rounded-lg border p-4 shadow-lg">
        {isAuth ? (
          'you have been logged in'
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UserName</FormLabel>
                    <FormControl>
                      <Input placeholder="userName" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormDescription>You password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
              {formError && (
                <span className="ml-2 font-bold text-red-500">
                  * {formError}
                </span>
              )}
            </form>
          </Form>
        )}
      </div>
    </div>
  )
})
