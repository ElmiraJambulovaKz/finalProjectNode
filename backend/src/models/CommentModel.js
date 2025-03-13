import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false },
})

commentSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    this.updatedAt = Date.now()
  }
  next()
})

const CommentModel = mongoose.model('Comment', commentSchema)

export default CommentModel
