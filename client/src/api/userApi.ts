import { host } from './axios'
import { JwtPayload, jwtDecode } from 'jwt-decode'

export const registration = async (email: string, password: string) => {
  const response = await host.post('api/user/register', {
    email,
    password,
    role: 'ADMIN',
  })
  const decoded = jwtDecode<JwtPayload>(response.data.token)
  return decoded
}

export const login = async (email: string, password: string) => {
  const response = await host.post('api/user/login', {
    email,
    password,
  })
  const decoded = jwtDecode<JwtPayload>(response.data.token)
  return decoded
}

export const check = async () => {
  const response = await host.post('api/auth')
  return response
}
