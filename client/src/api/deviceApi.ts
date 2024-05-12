import { IDeviceType } from '@/store/DeviceStore'
import { authHost, host } from './axios'

export const createDeviceType = async (typeName: string) => {
  console.log('CLIENT API NAME', name)
  const { data } = await authHost.post('api/type', { name: typeName })
  return data as IDeviceType
}

export const getDeviceType = async () => {
  const { data } = await host.get('api/type')
  return data.map(({ id, name }: IDeviceType) => ({
    id,
    name,
  })) as IDeviceType[]
}
