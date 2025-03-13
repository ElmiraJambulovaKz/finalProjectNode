import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  },
],
  isDeleted: {
    type: Boolean,
    default: false,
},
  commentsCount: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
  },
  imageUrl: {
    type: String,
  },
})

PostSchema.pre('save', function (next) {
  if (this.isModified('content') || this.isModified('title')) {
    this.updatedAt = Date.now() 
  }
  next()
})

const PostModel = mongoose.model('Post', PostSchema)

export default PostModel