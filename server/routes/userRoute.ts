import { Router } from 'express'
import { controller as UserController } from '../controller/userController'
import authMiddleware from '../middleware/authMiddleware'
import checkRole from '../middleware/checkRoleMiddleware'

const router = Router()

router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)
router.get('/user', checkRole('ADMIN'), UserController.getUserInfo)
router.put('/user', checkRole('ADMIN'), UserController.updateUser)

export default router
