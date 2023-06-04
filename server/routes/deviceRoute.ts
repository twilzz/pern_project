import { Router } from 'express'
import { controller as DeviceController } from '../controller/deviceController'

const router = Router()

router.post('/', DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)

export default router
