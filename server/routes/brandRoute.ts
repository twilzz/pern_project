import { Router } from 'express'
import { controller as BrandController } from '../controller/brandController'

const router = Router()

router.post('/', BrandController.create)
router.get('/', BrandController.getAll)

export default router
