import { Request, Response } from "express";
import mongoose from "mongoose";
import { FileModel } from "../models/file.model";
import { FolderModel } from "../models/folder.model";

// Fetch all files for the authenticated user
export const getFiles = async (req: Request, res: Response) => {
  try {
    const files = await FileModel.find({ userRef: req.user._id })
      .populate({
        path: "attachmentRef",
      })
      .populate({
        path: "folderRef",
      });

    res.status(200).json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch only favorite files for the authenticated user
export const getFilesByFavorite = async (req: Request, res: Response) => {
  try {
    const files = await FileModel.find({
      userRef: req.user._id,
      isFavorite: true,
    })
      .populate({
        path: "attachmentRef",
        select: "attachmentName attachmentType size attachmentPath dateTime",
      })
      .populate({
        path: "folderRef",
        select: "name",
      });

    res.status(200).json(files);
  } catch (err) {
    console.error("Error fetching favorite files:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch a file by its ID
export const getFileById = async (req: Request, res: Response) => {
  try {
    const file = await FileModel.findById(req.params.id)
      .populate({
        path: "attachmentRef",
        select: "attachmentName attachmentType size attachmentPath dateTime",
      })
      .populate({
        path: "folderRef",
        select: "name",
      });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json(file);
  } catch (err) {
    console.error("Error fetching file by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark a file as favorite or unfavorite
export const markAsFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isFavorite } = req.body;

    await FileModel.updateOne(
      { _id: id, userRef: req.user._id },
      { $set: { isFavorite } }
    );

    res.status(200).json({ message: "File favorite status updated successfully" });
  } catch (err) {
    console.error("Error updating file favorite status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new file
export const createFile = async (req: Request, res: Response) => {
  try {
    const { attachmentRef, folderRef, name } = req.body;

    const folder = await FolderModel.findById(folderRef);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    await FileModel.create({
      _id: new mongoose.Types.ObjectId(),
      userRef: req.user._id,
      attachmentRef,
      folderRef,
      folderPath: folder.path + "/" + name,
      name,
    });

    res.status(201).json({ message: "File created successfully" });
  } catch (err) {
    console.error("Error creating file:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a file by its ID
export const deleteFile = async (req: Request, res: Response) => {
  try {
    const file = await FileModel.findByIdAndDelete(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ message: "Server error" });
  }
};
