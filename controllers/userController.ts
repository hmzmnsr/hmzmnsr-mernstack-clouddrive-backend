import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.model";

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password,
      phone,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Log in a user
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Bad request" });
  }
};

// Get user profile
export const userProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as any).user._id;

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add a file to the user's favorites
export const addFavoriteFile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as any).user._id;
    const { fileId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favoriteFiles.includes(fileId)) {
      user.favoriteFiles.push(fileId);
      await user.save(); // This saves the updated favorite files to the database
    }

    return res.status(200).json({ message: "File added to favorites" });
  } catch (error) {
    console.error("Error adding favorite file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove a file from the user's favorites
export const removeFavoriteFile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as any).user._id;
    const { fileId } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favoriteFiles = user.favoriteFiles.filter(
      (favoriteFileId) => favoriteFileId.toString() !== fileId
    );
    await user.save(); // This saves the updated favorite files to the database

    return res.status(200).json({ message: "File removed from favorites" });
  } catch (error) {
    console.error("Error removing favorite file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
