import PostModel from '../models/PostModel.js'
import UserModel from '../models/UserModel.js'
import CommentModel from '../models/CommentModel.js'
import mongoose from 'mongoose'


//createPost
export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!author) {
      return res.status(400).json({ message: 'Author ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ message: 'Invalid author ID format' });
    }

    const user = await UserModel.findById(author);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPost = new PostModel({
      title,
      content,
      author,
      likes: [],
      isDeleted: false,
      parentCommentId: null,
    });

    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};


//getAllPosts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({ isDeleted: false }).populate('author', 'username')
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error })
  }
}



//getPostById
export const getPostById = async (req, res) => {
  try {
    const post = await PostModel.findOne({ _id: req.params.id, isDeleted: false}).populate('author', 'username')
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error })
  }
}



//updatePost
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        updatedAt: Date.now()
      },
      { new: true }
    )

    if (!updatePost) {
      return res.status(404).json({ message: 'Post not found' })
    }

    res.status(200).json(updatePost)
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error })
  }
}




//deletePost
export const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id)

    if(!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    post.isDeleted = true
    await post.save()

    await CommentModel.updateMany({ postId: req.params.id }, { isDeleted: true })

    res.status(200).json({ message: 'Post and its comments deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error })
  }
}