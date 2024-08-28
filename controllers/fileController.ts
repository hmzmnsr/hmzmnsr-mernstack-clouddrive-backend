import { Request, Response } from "express";
import mongoose from "mongoose";
import { FileModel } from "../models/file.model";

export const getFiles = async (req: Request, res: Response) => {
  try {
    const files = await FileModel.find({ userRef: req.user._id })
      .populate({
        path: "attachmentRef",
        select: "attachmentName attachmentType size attachmentPath dateTime",
      })
      .populate({
        path: "folderRef", // Ensure folderRef is populated
        select: "name",
      });

    res.status(200).json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ message: "Server error" });
  }
};

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
        path: "folderRef", // Ensure folderRef is populated
        select: "name",
      });

    res.status(200).json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFileById = async (req: Request, res: Response) => {
  try {
    const file = await FileModel.findById(req.params.id)
      .populate({
        path: "attachmentRef",
        select: "attachmentName attachmentType size attachmentPath dateTime",
      })
      .populate({
        path: "folderRef", // Ensure folderRef is populated
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

export const markAsFavorite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Include folderRef in the request body

    await FileModel.updateOne(
      { _id: id, userRef: req.user._id },
      { $set: { isFavorite: req.body.isFavorite } }
    );

    res.status(201).json({ message: "File created successfully" });
  } catch (err) {
    console.error("Error creating file:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createFile = async (req: Request, res: Response) => {
  try {
    const { attachmentRef, folderRef, folderPath } = req.body; // Include folderRef in the request body

    const file = new FileModel({
      _id: new mongoose.Types.ObjectId(),
      userRef: req.user._id,
      attachmentRef,
      folderRef, // Save the folderRef when creating a file
      folderPath,
    });
    await file.save();

    res.status(201).json({ message: "File created successfully" });
  } catch (err) {
    console.error("Error creating file:", err);
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
    console.error("Error deleting file:", err); // Log the error to see more details
    res.status(500).json({ message: "Server error" });
  }
};
