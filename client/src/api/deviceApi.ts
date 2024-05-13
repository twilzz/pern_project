import { IDeviceBrand, IDeviceType } from '@/store/DeviceStore'
import { authHost, host } from './axios'

export const createDeviceType = async (typeName: string) => {
  const { data } = await authHost.post('api/type', { name: typeName })
  return data as IDeviceType
}

export const getAllTypes = async () => {
  const { data } = await host.get('api/type')
  return data.map(({ id, name }: IDeviceType) => ({
    id,
    name,
  })) as IDeviceType[]
}

export const createBrand = async (brandName: string) => {
  const { data } = await authHost.post('api/brand', { name: brandName })
  return data as IDeviceBrand
}

export const getAllBrands = async () => {
  const { data } = await host.get('api/brand')
  return data.map(({ id, name }: IDeviceBrand) => ({
    id,
    name,
  })) as IDeviceBrand[]
}
