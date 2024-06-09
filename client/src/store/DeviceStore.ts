import { makeAutoObservable } from 'mobx'

export interface IDeviceType {
  id: number
  name: string
}

export interface IDeviceBrand {
  id: number
  name: string
}

export interface IDevice {
  id: number
  model: string
  image: string[]
  brand_id: number
  type_id: number
  description: string
  price: number
  rating: number
}

export interface IDeviceStore {
  types: IDeviceType[]
  brands: IDeviceBrand[]
  devices: IDevice[]
  selectedType: IDeviceType | null
  selectedBrands: IDeviceBrand[] | null
}

export default class DeviceStore implements IDeviceStore {
  private _types: IDeviceType[] = []
  private _brands: IDeviceBrand[] = []
  private _devices: IDevice[] = []
  private _selectedType: IDeviceStore['selectedType'] = null

  private _selectedBrands: IDeviceStore['selectedBrands'] = []

  constructor() {
    makeAutoObservable(this)
  }

  public get types() {
    return this._types
  }

  public get brands() {
    return this._brands
  }

  public get devices() {
    return this._devices
  }

  public get selectedType() {
    return this._selectedType
  }

  public get selectedBrands() {
    return this._selectedBrands
  }

  public setTypes = (type: IDeviceType[]): void => {
    this._types = type
  }
  public setBrands = (brands: IDeviceBrand[]) => {
    this._brands = brands
  }
  public setDevices = (devices: IDevice[]) => {
    this._devices = devices
  }
  public setSelectedType = (type: IDeviceType | null) => {
    this._selectedType = type
  }

  public setSelectedBrands = (brand: IDeviceBrand | null) => {
    if (this._selectedBrands && brand) {
      const brandInList = Boolean(
        this._selectedBrands?.find((sB) => sB.id === brand.id)
      )
      if (brandInList) {
        const newList = this._selectedBrands.filter((sB) => sB.id !== brand.id)
        this._selectedBrands = newList
      } else {
        const newList = this._selectedBrands.concat(brand)
        this._selectedBrands = newList
      }
    }
  }
}
