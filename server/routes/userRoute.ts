import { Router } from 'express'
import { controller as UserController } from '../controller/userController'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

router.post('/register', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)

export default router
