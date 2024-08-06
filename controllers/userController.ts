import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    console.log(req.user);

    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    await UserModel.create({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password,
      phone,
    });

    res.status(201).send("User created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
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

    res.status(200).json({
      token: user.generateToken(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Bad request" });
  }
};

export const userProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne(
      { _id: req.user._id },
      { password: 0 }
    );
    res.status(200).send(user);
  } catch (err) {
    res.status(404).json({ message: "Profile not found" });
  }
};
