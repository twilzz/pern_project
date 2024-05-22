import { Router } from 'express'
import { controller as DeviceController } from '../controller/deviceController'

const router = Router()

router.post('/', DeviceController.create)
router.get('/allByPage', DeviceController.getAllByPage)
router.get('/allDevices', DeviceController.getAllDevices)
router.get('/:id', DeviceController.getOne)

export default router
