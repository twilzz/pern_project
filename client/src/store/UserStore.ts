import { makeAutoObservable } from 'mobx'

export interface IUser {
  email: string
  role: string
  name?: string
  age?: number
  avatar?: string
}

export interface IUserStore {
  isAuth: boolean
  user: IUser | null
}

export default class UserStore implements IUserStore {
  private _isAuth = false
  private _user: IUser | null = null

  constructor() {
    makeAutoObservable(this)
  }

  public get user() {
    return this._user
  }

  public get isAuth() {
    return this._isAuth
  }

  public setIsAuth = (state: boolean) => (this._isAuth = state)

  public setUser = (userData: IUser | null) => (this._user = userData)
}
