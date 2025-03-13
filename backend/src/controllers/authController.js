import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const loginUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email && !username) {
      return res.status(400).json({ message: 'Provide email or username' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Provide password' });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if(!email || !password) {
      res.status(400).json({message: 'Provide email and password together'})
    }
    if (!email) {
      res.status(400).json({message: 'Provide email'})
    }
    if (!password) {
      res.status(400).json({message: 'Provide password'})
    }
    const newUser = new User({email, password, username})
    await newUser.save()
    res.status(201).json({message: 'user was registered'})
  } catch (error) {
    res.status(500).json(error.message)
  }
}