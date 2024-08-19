import { Request, Response } from "express";
import mongoose from "mongoose";
import { FileModel } from "../models/file.model";

export const getFiles = async (req: Request, res: Response) => {
  try {
    const files = await FileModel.find({ userRef: req.user._id });
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFileById = async (req: Request, res: Response) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createFile = async (req: Request, res: Response) => {
  try {
    const { attachmentRef, folderPath } = req.body;

    const file = new FileModel({
      _id: new mongoose.Types.ObjectId(),
      userRef: req.user._id,
      attachmentRef,
      folderPath,
    });
    await file.save();

    res.status(201).json({ message: "File created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const file = await FileModel.findByIdAndDelete(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};