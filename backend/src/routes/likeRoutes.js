import { Router } from 'express'
import { createLike, getLikeByPost } from '../controllers/likeController.js'

const router = Router()

router.post('/', createLike)

router.get('/:postId', getLikeByPost)

export default router
