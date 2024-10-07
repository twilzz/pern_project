import { Router } from 'express'
import { controller as BrandController } from '../controller/brandController'
import checkRole from '../middleware/checkRoleMiddleware'

const router = Router()

router.post('/', BrandController.create)
router.get('/', BrandController.getAll)
router.delete('/:id', checkRole('ADMIN'), BrandController.delete)

export default router
