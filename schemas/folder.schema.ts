import mongoose, { Document, Schema } from "mongoose";

// Folder Interface
export interface IFolder extends Document {
  path: string;
  name: string;
  userRef: mongoose.Types.ObjectId;
}

// Folder Schema
const folderSchema: Schema<IFolder> = new mongoose.Schema({
  path: { type: String, required: true },
  name: { type: String, required: true },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

// Pre-save hook to check for duplicate folders
folderSchema.pre<IFolder>("save", async function (next) {
  const duplicate = await mongoose.model<IFolder>("Folders").exists({
    path: this.path,
    userRef: this.userRef,
  });

  if (duplicate) {
    throw new Error("Folder already exists at this path");
  }

  next();
});

export default folderSchema;
