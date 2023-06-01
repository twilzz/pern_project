import { Router } from 'express'
import brandRoute from './brandRoute'
import deviceRoute from './deviceRoute'
import typeRoute from './typeRoute'
import userRoute from './userRoute'

const router = Router()

router.use('/user', userRoute)
router.use('/type', typeRoute)
router.use('/brand', brandRoute)
router.use('/device', deviceRoute)

export default router
