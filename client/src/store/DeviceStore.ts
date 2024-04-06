import { makeAutoObservable } from 'mobx'
import RootStore from './RootStore'

export interface IDeviceStore {
  type: { id: number; name: string }[]
  brands: { id: number; name: string }[]
  devices: {
    id: number
    name: string
    price: number
    rating: number
    img: string
  }[]
}

export default class DeviceStore implements IDeviceStore {
  private rootStore: RootStore
  private _type: IDeviceStore['type'] = [
    { id: 1, name: 'Холодильники' },
    { id: 2, name: 'Смартфоны' },
  ]
  private _brands: IDeviceStore['brands'] = [
    { id: 1, name: 'Samsung' },
    { id: 2, name: 'Apple' },
  ]
  private _devices: IDeviceStore['devices'] = [
    {
      id: 1,
      name: 'Iphone',
      price: 90000,
      rating: 5,
      img: 'https://www.smth...',
    },
    {
      id: 2,
      name: 'Galaxy s23',
      price: 60000,
      rating: 5,
      img: 'https://www.smth...',
    },
    {
      id: 3,
      name: 'Xiaomi m9 lite',
      price: 30000,
      rating: 5,
      img: 'https://www.smth...',
    },
  ]

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  public get type() {
    return this.rootStore.deviceStore._type
  }

  public get brands() {
    return this.rootStore.deviceStore._brands
  }

  public get devices() {
    return this.rootStore.deviceStore._devices
  }

  public setType(type: IDeviceStore['type']): void {
    this.rootStore.deviceStore._type = type
  }
  public setBrands(brands: IDeviceStore['brands']) {
    this.rootStore.deviceStore._brands = brands
  }
  public setDevices(devices: IDeviceStore['devices']) {
    this.rootStore.deviceStore._devices = devices
  }
}
