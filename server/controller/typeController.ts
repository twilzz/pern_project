import { NextFunction, Request, Response } from 'express'
import Type from '../models/Type'
import { ApiError } from '../utils/ApiError'

class TypeController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body
    if (!name) {
      return next(ApiError.badRequest('Empty request parameter'))
    }
    try {
      const type = await Type.create({ name })
      return res.json(type)
    } catch (error) {
      next(ApiError.badRequest('Error in device type creation process'))
    }
  }

  async getAll(req: Request, res: Response) {
    const types = await Type.findAll()
    return res.json(types)
  }
}

export const controller = new TypeController()
