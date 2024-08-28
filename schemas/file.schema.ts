import mongoose, { Document, Schema } from "mongoose";

// File Interface
export interface IFile extends Document {
  attachmentRef: mongoose.Types.ObjectId;
  userRef: mongoose.Types.ObjectId;
  folderRef: mongoose.Types.ObjectId; // Ensure folderRef field is added
  folderPath: string;
  isFavorite: boolean;
}

// File Schema
const fileSchema: Schema<IFile> = new mongoose.Schema({
  attachmentRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
    required: true,
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  folderRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  }, // Add folderRef field
  folderPath: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
});

export default fileSchema;
