import CommentModel from '../models/CommentModel.js'

export const createComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body
    const newComment = new CommentModel({ userId, postId, content })
    await newComment.save()
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getCommentByPost = async (req, res) => {
  try {
    const postId = req.params.postId
    const comments = await CommentModel.find({ postId })
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}




