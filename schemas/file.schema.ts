import mongoose, { Document, Schema } from "mongoose";

// File Interface
export interface IFile extends Document {
  fileRef: mongoose.Types.ObjectId;
  userRef: mongoose.Types.ObjectId;
  folderPath: string;
}

// File Schema
const fileSchema: Schema<IFile> = new mongoose.Schema({
  fileRef: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: true },
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  folderPath: { type: String, required: true },
});

export default fileSchema;
