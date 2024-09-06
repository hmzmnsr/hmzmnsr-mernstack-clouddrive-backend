import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.model";
import { updatePasswordValidator, updateUserProfileValidator } from "../validators/userSchema.dto";
import { bcryptCompare, bcryptHash } from "../common/encryption.common";

// Get all users
export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create a new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req.body);
    const { name, email, password, dateOfBirth ,phone  } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password,
      dateOfBirth,
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
export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
export const userProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
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



// Update Password
export const updatePassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Validate the filtered data
    const { error } = updatePasswordValidator.validate({ oldPassword, newPassword });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const userId = (req as any).user._id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcryptCompare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    const encryptedPassword = await bcryptHash(newPassword);
    await UserModel.updateOne({_id: userId},{
      password: encryptedPassword
       })

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const updateUserProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validate the request body
    const { error, value } = updateUserProfileValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Extract the validated data
    const { name, phone, dateOfBirth } = value;

    // Prepare the data to update
    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;
    if (phone) dataToUpdate.phone = phone;
    if (dateOfBirth) dataToUpdate.dateOfBirth = dateOfBirth;

    console.log("Data to update:", dataToUpdate);

    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    // Get the user ID from the token
    const userId = (req as any).user._id;

    // Perform the update
    const updateResult = await UserModel.updateOne({ _id: userId }, { $set: dataToUpdate });

    console.log("Update result:", updateResult);

    if (updateResult.acknowledged && updateResult.matchedCount > 0) {
      return res.status(200).json({ message: "Profile updated successfully" });
    } else {
      return res.status(404).json({ message: "User not found or no changes made" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};