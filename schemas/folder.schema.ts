import mongoose, { Document, Schema } from "mongoose";

// Folder Interface
//Added UserRef
export interface IFolder extends Document {
  path: string;
  name: string;
  userRef: mongoose.Types.ObjectId;
}

// Folder Schema
// Added UserRef
const folderSchema: Schema<IFolder> = new mongoose.Schema({
  path: { type: String, required: true },
  name: { type: String, required: true },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

export default folderSchema;