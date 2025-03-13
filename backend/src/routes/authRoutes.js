import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import authMiddleware from '../middlewares/authMiddleware.js';
import { registerUser } from '../controllers/authController.js';
dotenv.config();


const router = express.Router();
const users = [];

router.post('/register', registerUser)


export default router






