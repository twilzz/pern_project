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

  async delete(req: Request, res: Response) {
    const { id } = req.params
    console.log('Device type with ID:', id)
    const response = await Type.destroy({ where: { id } })
    if (response) return res.json('Successfully deleted.')
  }
}

export const controller = new TypeController()
