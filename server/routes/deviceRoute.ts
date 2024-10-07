import { Router } from 'express'
import { controller as DeviceController } from '../controller/deviceController'
import checkRole from '../middleware/checkRoleMiddleware'

const router = Router()

router.post('/', DeviceController.create)
router.get('/allByPage', DeviceController.getAllByPage)
router.get('/allDevices', DeviceController.getAllDevices)
router.get('/:id', DeviceController.getOne)
router.put('/:id', DeviceController.updateDeviceInfo)
router.delete('/:id', checkRole('ADMIN'), DeviceController.deleteDeviceById)

export default router
