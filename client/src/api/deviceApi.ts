import { authHost, host } from './axios'
import { IDevice } from '@/store/DeviceStore'

export const createDeviceType = async (name: string) => {
    console.log(name);
    
  const {data} = await authHost.post('api/type', name)
  return data as IDevice['type']
}

export const getDeviceType = async () => {
    const {data} = await host.get('api/type')
    return data as IDevice['type']
}