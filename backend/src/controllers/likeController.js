import LikeModel from '../models/LikeModel.js'

const createLike = async (req, res) => {
  try {
    const { userId, postId } = req.body
    const newLike = new LikeModel({ userId, postId })
    await newLike.save()
    res.status(201).json(newLike)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

const getLikeByPost = async (req, res) => {
  try {
    const { postId } = req.params
    const likes = await LikeModel.find({ postId })
    res.status(200).json(likes)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export { createLike, getLikeByPost }

