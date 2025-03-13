import express from 'express'
import mongoose from 'mongoose'
import postRoutes from './routes/postRoutes.js'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import followRoutes from './routes/followRoutes.js'
import connectDb from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

connectDb()

app.use('/api/auth', authRoutes)
app.use('api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/follows', followRoutes)
app.use('/posts', postRoutes)


mongoose.connect("mongodb://localhost:27017/socialnetwork", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err))


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

export default app