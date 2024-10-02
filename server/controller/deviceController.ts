import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import Device from '../models/Device'
import Device_info from '../models/Device_info'
import { ApiError } from '../utils/ApiError'

interface DeviceData {
  id: string
  model: string
  price: string
  image: string[]
  type_id: number
  brand_id: number
  info: { device_id: string; title: string; description: string }[]
}

class DeviceController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let { model, price, brand_id, type_id, info, rating } = req.body

      let deviceData: { [key: string]: any } = {
        model,
        price,
        brand_id,
        type_id,
        rating,
      }

      let files = req.files
      if (files?.image) {
        const logo: UploadedFile | UploadedFile[] = files.image
        const fileName = uuidv4() + '.jpg'
        if (!Array.isArray(logo)) {
          logo.name = fileName
          logo.mv(path.resolve(__dirname, '..', 'static', fileName))
          deviceData.image = [fileName]
        }
      }

      const device = await Device.create(deviceData)

      if (info) {
        const data2Create: { name: string; value: string }[] = JSON.parse(info)
        data2Create.forEach((entry) => {
          if (entry.name && entry.value)
            Device_info.create({
              title: entry.name,
              description: entry.value,
              device_id: device.id,
            })
        })
      }

      return res.json(device)
    } catch (error) {
      next(ApiError.badRequest(error as string))
    }
  }

  async getAllByPage(req: Request, res: Response) {
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

  async getAllDevices(req: Request, res: Response) {
    const devices = await Device.findAll()
    return res.json(devices)
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params
    const device = await Device.findOne({
      where: { id },
      attributes: [
        'id',
        'model',
        'price',
        'rating',
        'image',
        'type_id',
        'brand_id',
      ],
    }).then((data) => data?.dataValues)
    const deviceInfo = await Device_info.findAll({
      where: { device_id: id },
      attributes: ['device_id', 'title', 'description'],
    }).then((data) => data.map((d) => d.dataValues))
    res.json({ ...device, info: deviceInfo })
  }

  async updateDeviceInfo(req: Request, res: Response) {
    const { id: deviceId } = req.params
    const deviceData: DeviceData = req.body
    const files = req.files
    const storedName: string[] = []

    if (files) {
      const uploadedImages = Object.values(files).flat()
      for await (let file of uploadedImages) {
        const fileName = uuidv4() + '.jpg'
        await file.mv(path.resolve(__dirname, '..', 'static', fileName))
        storedName.push(fileName)
      }
    }
    let images: string[] = []

    if ('image[]' in deviceData)
      images = Array.isArray(deviceData['image[]'])
        ? deviceData['image[]']
        : [deviceData['image[]']]

    const updatedDev = await Device.update(
      {
        ...deviceData,
        image: images.concat(storedName),
      },
      { where: { id: deviceId } }
    )
    res.json(updatedDev)
  }
}

export const controller = new DeviceController()
