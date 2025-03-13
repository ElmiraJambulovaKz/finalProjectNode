import FollowModel from '../models/FollowModel.js'

const createFollow = async (req, res) => {
  try {
    const { followerId, followedId } = req.body
    const newFollow = new FollowModel({ followerId, followedId })
    await newFollow.save()
    res.status(201).json(newFollow)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

const getFollows = async (req, res) => {
  try {
    const { userId } = req.params
    const follows = await FollowModel.find({ followerI: userId })
    res.status(200).json(follows)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export { createFollow, getFollows }