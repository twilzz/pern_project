import { Router } from 'express'
import { controller as TypeController } from '../controller/typeController'
import checkRole from '../middleware/checkRoleMiddleware'

const router = Router()

router.post('/', checkRole('ADMIN'), TypeController.create)
router.get('/', TypeController.getAll)
router.delete('/:id', checkRole('ADMIN'), TypeController.delete)

export default router
