import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { FileModel } from "../models/file.model"; // Import your FileModel
import { FolderModel } from "../models/folder.model"; // Import your FolderModel

// Middleware to check if the referenced file and folder exist
export const checkFileReferences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attachmentExists = await FileModel.exists({ _id: req.body.attachmentRef });
    const folderExists = await FolderModel.exists({ _id: req.body.folderRef });

    if (!attachmentExists || !folderExists) {
      return res.status(400).send("Referenced file or folder does not exist");
    }

    next();
  } catch (err) {
    console.error("Error checking file references:", err);
    res.status(500).json({ message: "Server error" });
  }
};
