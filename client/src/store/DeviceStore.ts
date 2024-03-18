import { makeAutoObservable } from 'mobx'

interface IDeviceStore {
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

  constructor() {
    makeAutoObservable(this)
  }

  public get type() {
    return this._type
  }

  public get brands() {
    return this._brands
  }

  public get devices() {
    return this._devices
  }

  public setType(type: IDeviceStore['type']): void {
    this._type = type
  }
  public setBrands(brands: IDeviceStore['brands']) {
    this._brands = brands
  }
  public setDevices(devices: IDeviceStore['devices']) {
    this._devices = devices
  }
}
