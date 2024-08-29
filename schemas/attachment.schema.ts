import mongoose, { Document, Schema } from "mongoose";

// Attachment Interface
export interface IAttachment extends Document {
  path: string;
  name: string;
  type: string;
  createdAt: Date;
  userRef: mongoose.Types.ObjectId;
  size: number;
}

// Attachment Schema
const attachmentSchema: Schema<IAttachment> = new mongoose.Schema({
  path: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  size: { type: Number, required: true },
});

export default attachmentSchema;
