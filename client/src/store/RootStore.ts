import BasketStore from './BasketStore'
import DeviceStore from './DeviceStore'
import UserStore from './UserStore'

export class RootStore {
  deviceStore: DeviceStore
  userStore: UserStore
  basketStore: BasketStore
  constructor() {
    this.deviceStore = new DeviceStore()
    this.userStore = new UserStore()
    this.basketStore = new BasketStore()
  }
}
