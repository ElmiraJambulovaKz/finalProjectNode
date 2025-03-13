import mongoose, { mongo } from 'mongoose'

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postOd: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
})

const LikeModel = mongoose.model('Like', likeSchema)
export default LikeModel
