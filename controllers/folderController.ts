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
    const { name, path } = req.body;

    // Already being done in the folders.model // Remove this
    // const existingFolder = await FolderModel.findOne({
    //   path,
    //   userRef: req.user._id,
    // });

    // if (existingFolder) {
    //   return res.status(409).json({ message: "Folder already exists" });
    // }

    //Added userRef, else we can't decide to which user this folder belongs to
    await FolderModel.create({
      _id: new mongoose.Types.ObjectId(),
      userRef: req.user._id,
      path,
      name,
    });

    res.status(201).json({ message: "Folder created successfully" });
  } catch (err) {
    console.log(err);
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
