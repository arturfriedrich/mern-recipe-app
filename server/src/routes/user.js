import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserModel } from '../models/Users.js';

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

router.post("/login");

export { router as userRouter }