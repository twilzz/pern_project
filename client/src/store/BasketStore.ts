import { makeAutoObservable } from 'mobx'
import { IDeviceStore } from './DeviceStore'

export interface IBasketStore {
  devices: IDeviceStore['devices']
}

export default class BasketStore implements IBasketStore {
  private _devices: IDeviceStore['devices'] = []

  constructor() {
    makeAutoObservable(this)
  }

  public get devices() {
    return this._devices
  }

  public setDevices(state: IBasketStore['devices']): void {
    this._devices = state
  }
}
