import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

// Middleware to check if the referenced file and folder exist
export const checkFileReferences = async (req: Request, res: Response, next: NextFunction) => {
  const FileModel = mongoose.model("File");
  const FolderModel = mongoose.model("Folder");

  const fileExists = await FileModel.exists({ _id: req.body.fileRef });
  const folderExists = await FolderModel.exists({ _id: req.body.folderRef });

  if (!fileExists || !folderExists) {
    return res.status(400).send("Referenced file or folder does not exist");
  }

  next();
};
