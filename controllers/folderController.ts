import { Request, Response } from "express";
import mongoose from "mongoose";
import { FolderModel } from "../models/folder.model";

export const getFolders = async (req: Request, res: Response) => {
  try {
    //Populating Reference Data
    const folders = await FolderModel.find({ userRef: req.user._id }).populate(
      "userRef",
      {
        _id: 1,
        name: 1,
      }
    );

    res.status(200).json(folders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFolderById = async (req: Request, res: Response) => {
  try {
    //Populating Reference Data
    // Added UserRef so the user can get only his own folders
    const folder = await FolderModel.findById({
      _id: req.params.id,
      userRef: req.user._id,
    }).populate("userRef", {
      _id: 1,
      name: 1,
    });

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
    //Added userRef, so the user can only delete his own folders
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
