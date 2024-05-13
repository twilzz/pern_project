import { IUser } from '@/store/UserStore'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { authHost, host } from './axios'

export const registration = async (email: string, password: string) => {
  const response = await host.post('api/user/register', {
    email,
    password,
    role: 'ADMIN',
  })
  localStorage.setItem('token', response.data.token)
  const decoded = jwtDecode<JwtPayload>(response.data.token)
  return decoded as IUser
}

export const login = async (email: string, password: string) => {
  const response = await host.post('api/user/login', {
    email,
    password,
  })
  localStorage.setItem('token', response.data.token)
  const decoded = jwtDecode<JwtPayload>(response.data.token)
  return decoded as IUser
}

export const checkUser = async () => {
  const response = await authHost.post('api/auth')
  localStorage.setItem('token', response.data.token)
  const decoded = jwtDecode<JwtPayload>(response.data.token)
  return decoded as IUser
}

export const getUserInfo = async () => {}

export const updateUserInfo = async () => {}
