import { Request, Response } from "express";
import mongoose from "mongoose";
import { FolderModel } from "../models/folder.model";

export const getFolders = async (req: Request, res: Response) => {
  try {
    const folders = await FolderModel.find({ userRef: req.user._id });
    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFolderById = async (req: Request, res: Response) => {
  try {
    const folder = await FolderModel.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.status(200).json(folder);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { path } = req.body;

    const existingFolder = await FolderModel.findOne({
      userRef: req.user._id,
      path,
    });
    if (existingFolder) {
      return res.status(409).json({ message: "Folder already exists" });
    }

    const folder = new FolderModel({
      _id: new mongoose.Types.ObjectId(),
      userRef: req.user._id,
      path,
    });
    await folder.save();

    res.status(201).json({ message: "Folder created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folder = await FolderModel.findByIdAndDelete(req.params.id);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
