import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const router = express.Router()
const users = []

router.post('register', async (req, res) => {
  const { username, password } = req.body
})
