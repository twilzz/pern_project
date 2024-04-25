import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}
const host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const authInterceptor = (config: AdaptAxiosRequestConfig) => {
  if (config.headers)
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

authHost.interceptors.request.use(authInterceptor)

export { authHost, host }
