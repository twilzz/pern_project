import { makeAutoObservable } from 'mobx'

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

  constructor() {
    makeAutoObservable(this)
  }

  public get user() {
    return this._user
  }

  public get isAuth() {
    return this._isAuth
  }

  public setIsAuth(state: boolean): void {
    this._isAuth = state
  }
  public setUser(userData: IUser) {
    this._user = userData
  }
}
