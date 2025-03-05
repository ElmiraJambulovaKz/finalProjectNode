import express from "express"
import connectDb, { connectToDatabase } from "./src/config/db.js"
import "dotenv/config"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
const app = express();
app.use(express.json())
app.use('/api/posts', authRoutes)


const PORT = process.env.PORT || 3333

connectDb()
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
})