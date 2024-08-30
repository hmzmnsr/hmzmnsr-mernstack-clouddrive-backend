import { Request, Response } from "express";
import mongoose from "mongoose";
import { FileModel } from "../models/file.model";
import { FolderModel } from "../models/folder.model";

// Don't use map here

export const getAllFolders = async (req: Request, res: Response) => {
  try {
    // Fetch folders and populate with user data
    const folders = await FolderModel.find(
      { userRef: req.user._id },
      {
        _id: 1,
        name: 1,
      }
    ).sort({ _id: -1 });

    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getRecentFolders = async (req: Request, res: Response) => {
  try {
    // Fetch folders and populate with user data
    const folders = await FolderModel.find({ userRef: req.user._id })
      .populate("userRef", {
        select: ["_id", "name"],
      })
      .limit(5)
      .sort({ _id: -1 });

    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFolders = async (req: Request, res: Response) => {
  try {
    // Fetch folders and populate with user data
    const folders = await FolderModel.find({ userRef: req.user._id })
      .populate("userRef", {
        select: ["_id", "name"],
      })
      .sort({ _id: -1 });

    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFolderById = async (req: Request, res: Response) => {
  try {
    // Fetch folder by ID and populate with user data
    const folder = await FolderModel.findOne({
      _id: req.params.id,
      userRef: req.user._id,
    }).populate("userRef", {
      select: ["_id", "name"],
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Populate folder with associated files
    const files = await FileModel.find({ folderPath: folder._id }).populate(
      "attachmentRef",
      {
        select: ["_id", "name", "path", "type", "size", "createdAt"],
      }
    );

    res.status(200).json({
      ...folder,
      files,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, path } = req.body;

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
    // Delete folder only if it belongs to the user
    const folder = await FolderModel.findByIdAndDelete({
      _id: req.params.id,
      userRef: req.user._id,
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
