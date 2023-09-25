import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { UserModel } from '../models/Users.js';

dotenv.config()

// Create a router
const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    // Check if the user exists
    const user = await UserModel.findOne({ username });

    // If the user exists, return an error
    if (user) {
        return res.json({ message: "User already exists" })
    }

    // If the user doesn't exist, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
        username,
        password: hashedPassword,
    });
    
    // Save the user
    await newUser.save();

    // Return a success message
    res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await UserModel.findOne({ username });
  
    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exists" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, userID: user._id });
  });

export { router as userRouter }