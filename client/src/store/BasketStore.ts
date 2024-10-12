import { makeAutoObservable } from 'mobx'
import { IDevice } from './DeviceStore'

export interface IBasketStore {
  devices: { device: IDevice; count: number }[]
}

export default class BasketStore implements IBasketStore {
  private _devices: { device: IDevice; count: number }[] = []

  constructor() {
    makeAutoObservable(this)
  }

  public get devices() {
    return this._devices
  }

  public get totalBasketPrice() {
    const priceArray = this._devices.map((d) => d.device.price * d.count)
    return priceArray.reduce((sum, current) => sum + current, 0)
  }

  public clearBasket = () => {
    this._devices = []
  }

  public addToBasket = (candidate: IDevice) => {
    const isDeviceInList = this._devices.find(
      (d) => d.device.id === candidate.id
    )
    if (!isDeviceInList) {
      this._devices = this._devices.concat({ device: candidate, count: 1 })
    } else {
      this._devices = this._devices.map(({ device, count }) => {
        if (device.id === device.id) {
          return { device, count: count + 1 }
        } else {
          return { device, count }
        }
      })
    }
  }

  public setDeviceCount = (devId: number, changeType: 'plus' | 'minus') => {
    this._devices = this._devices.map(({ device, count }) => {
      if (device.id === devId) {
        return {
          device,
          count:
            changeType === 'plus' ? count + 1 : count > 0 ? count - 1 : count,
        }
      } else {
        return { device, count }
      }
    })
  }
}
