import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import Device from '../models/Device'
import Device_info from '../models/Device_info'
import { ApiError } from '../utils/ApiError'

class DeviceController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, price, brand_id, type_id, info, rating } = req.body
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.')
            }
            const { image } = req.files
            const logo: UploadedFile | UploadedFile[] = image

            if (!Array.isArray(logo)) {
                const fileName = uuidv4() + '.jpg'
                logo.name = fileName
                logo.mv(path.resolve(__dirname, '..', 'static', fileName))

                const device = await Device.create({
                    name,
                    rating,
                    price,
                    brand_id,
                    type_id,
                    info,
                    image: fileName,
                })
                return res.json(device)
            }
        } catch (error) {
            next(ApiError.badRequest(error as string))
        }
    }

    async getAll(req: Request, res: Response) {
        let { brandId, typeId } = req.query
        let page: number = Number(req.query.page) || 1
        let limit: number = Number(req.query.limit) || 9
        let offset = page * limit - limit
        let devices
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { type_id: typeId },
                limit,
                offset,
            })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: { brand_id: brandId },
                limit,
                offset,
            })
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { brand_id: brandId, type_id: typeId },
                limit,
                offset,
            })
        }
        return res.json(devices)
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params
        const device = await Device.findOne({
            where: { id },
            include: [{ model: Device_info, as: 'info' }],
        })
        res.json(device)
    }
}

export const controller = new DeviceController()
