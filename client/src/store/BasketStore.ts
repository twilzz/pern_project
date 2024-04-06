import { makeAutoObservable } from 'mobx'
import { IDeviceStore } from './DeviceStore'
import RootStore from './RootStore'

export interface IBasketStore {
  devices: IDeviceStore['devices']
}

export default class BasketStore implements IBasketStore {
  private _devices: IBasketStore['devices'] = []
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  public get devices() {
    return this.rootStore.basketStore._devices
  }

  public setDevices(state: IBasketStore['devices']): void {
    this.rootStore.basketStore._devices = state
  }
}
