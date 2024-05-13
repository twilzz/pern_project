import { NextFunction, Request, Response } from 'express'
import Brand from '../models/Brand'
import { ApiError } from '../utils/ApiError'

class BrandController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body
    if (!name) {
      return next(ApiError.badRequest('Empty request parameter'))
    }
    try {
      const type = await Brand.create({ name })
      return res.json(type)
    } catch (error) {
      next(ApiError.badRequest('Error in device brand creation process'))
    }
  }

  async getAll(req: Request, res: Response) {
    const brands = await Brand.findAll()
    return res.json(brands)
  }
}

export const controller = new BrandController()
