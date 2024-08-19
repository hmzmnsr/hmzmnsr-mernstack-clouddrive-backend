import { Request, Response } from "express";
import mongoose from "mongoose";
import { AttachmentModel } from "../models/attachment.model";

export const getAttachments = async (req: Request, res: Response) => {
  try {
    const attachments = await AttachmentModel.find({ userRef: req.user._id });
    res.status(200).json(attachments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAttachmentById = async (req: Request, res: Response) => {
  try {
    const attachment = await AttachmentModel.findById(req.params.id);
    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }
    res.status(200).json(attachment);
  } catch (err) {
    res.status(500).json({ message: "Server error" }); 
  }
};

export const createAttachment = async (req: Request, res: Response) => {
  try {
    const { attachmentPath, attachmentName, attachmentType, attachmentOwnership, size } = req.body;

    const attachment = new AttachmentModel({
      _id: new mongoose.Types.ObjectId(),
      attachmentPath,
      attachmentName,
      attachmentType,
      attachmentOwnership,
      userRef: req.user._id,
      size,
    });
    await attachment.save();

    res.status(201).json({ message: "Attachment created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAttachment = async (req: Request, res: Response) => {
  try {
    const attachment = await AttachmentModel.findByIdAndDelete(req.params.id);
    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }
    res.status(200).json({ message: "Attachment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};