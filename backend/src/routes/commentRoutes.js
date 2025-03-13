import express from 'express'
import { createComment, getCommentByPost } from '../controllers/commentController.js'

const router = express.Router()

router.post('/', createComment)

router.get('/:postId', getCommentByPost)

export default router