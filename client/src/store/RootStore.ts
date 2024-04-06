import BasketStore from './BasketStore'
import DeviceStore from './DeviceStore'
import UserStore from './UserStore'

export default class RootStore {
  deviceStore: DeviceStore
  userStore: UserStore
  basketStore: BasketStore
  constructor() {
    this.userStore = new UserStore(this)
    this.deviceStore = new DeviceStore(this)
    this.basketStore = new BasketStore(this)
  }
}
