import mongoose, { Document, Schema } from "mongoose";

// File Interface
export interface IFile extends Document {
  attachmentRef: mongoose.Types.ObjectId;
  userRef: mongoose.Types.ObjectId;
  folderPath: string;
}

// File Schema
const fileSchema: Schema<IFile> = new mongoose.Schema({
  attachmentRef: { type: mongoose.Schema.Types.ObjectId, ref: "Attachment", required: true },
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  folderPath: { type: String, required: true },
});

export default fileSchema;