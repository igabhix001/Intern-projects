import express from "express";
import { Account, User } from "../db.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import authMiddleware from "../middleware.js";
import bcrypt from "bcrypt";


const router = express.Router();

const signinBody = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

router.post("/signin", async (req, res) => {
  try {
    // Validate request body
    const { success, error } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "Invalid inputs",
        errors: error.errors,
      });
    }
    
    const { username, password: plaintextpass } = req.body;
    
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    
    // Retrieve hashed password from user record
    const hash = user.password;
    if (!hash) {
      return res.status(500).json({
        message: "User record is missing password hash",
      });
    }
    
    // Compare plaintext password with hash
    const isValidPassword = await bcrypt.compare(plaintextpass, hash);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

const signUpBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  const { success } = signUpBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  }

  const { username, password, firstName, lastName } = req.body;

  const existingUser = await User.findOne({
    username
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({
    username,
    password: hashedPassword,
    firstName,
    lastName
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({
    message: "User Created",
    token: token,
  });
});

const updateData = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().min(6).optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateData.safeParse(req.body);
  if (!success) {
    return {
      message: "Error while updating information",
    };
  }
  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export default router;
