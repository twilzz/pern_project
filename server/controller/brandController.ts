import { Request, Response } from 'express'
import Brand from '../models/Brand'

class BrandController {
  async create(req: Request, res: Response) {
    const { name } = req.body
    const type = await Brand.create({ name })
    return res.json(type)
  }

  async getAll(req: Request, res: Response) {
    const types = await Brand.findAll()
    return res.json(types)
  }
}

export const controller = new BrandController()
