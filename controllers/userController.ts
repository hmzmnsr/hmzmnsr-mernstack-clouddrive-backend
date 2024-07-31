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
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();

    res.status(201).json({
      token,
    });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};
