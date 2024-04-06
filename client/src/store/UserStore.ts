import { makeAutoObservable } from 'mobx'
import RootStore from './RootStore'

export interface IUser {
  name: string
  age: number
}

export interface IUserStore {
  isAuth: boolean
  user: IUser | null
}

export default class UserStore implements IUserStore {
  private _isAuth = false
  private _user: IUser | null = { name: 'Alex Twils', age: 37 }
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  public get user() {
    return this.rootStore.userStore._user
  }

  public get isAuth() {
    return this.rootStore.userStore._isAuth
  }

  public setIsAuth(state: boolean): void {
    this.rootStore.userStore._isAuth = state
  }
  public setUser(userData: IUser) {
    this.rootStore.userStore._user = userData
  }
}
