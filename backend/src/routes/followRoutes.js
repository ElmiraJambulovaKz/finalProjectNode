import { Router } from 'express'
import { createFollow, getFollows } from '../controllers/followController.js'

const router = Router()

router.post('/', createFollow)

router.get('/:userId', getFollows)

export default router
