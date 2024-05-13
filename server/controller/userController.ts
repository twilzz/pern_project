import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import Basket from '../models/Basket'
import User from '../models/User'
import { ApiError } from '../utils/ApiError'
import { generateJwt } from '../utils/generateToken'

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const { email, password, role } = req.body
    console.log('DING', email, password)

    if (!email || !password) {
      return next(ApiError.badRequest('Invalid email or password'))
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.forbidden('User with this email already exists'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    console.log('USER', user.id)

    try {
      const basket = await Basket.create({ userId: user.id })
    } catch (error) {
      console.log('ERROR in Basket Creation process', error)
    }

    const token = generateJwt(user.id, email, role)
    return res.json({ token })
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.internal('User with such an email was not found'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Wrong password'))
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })
  }

  async check(req: Request, res: Response, next: NextFunction) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({ token })
  }

  async getUserInfo(req: Request, res: Response, next: NextFunction) {}

  async updateUser(req: Request, res: Response, next: NextFunction) {}
}

export const controller = new UserController()
