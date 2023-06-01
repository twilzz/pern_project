import { Request, Response } from 'express'
import Type from '../models/Type'

class TypeController {
  async create(req: Request, res: Response) {
    const { name } = req.body
    const type = await Type.create({ name })
    return res.json(type)
  }

  async getAll(req: Request, res: Response) {
    const types = await Type.findAll()
    return res.json(types)
  }
}

export const controller = new TypeController()
