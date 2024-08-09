import mongoose, { Document, Schema } from "mongoose";

// Attachment Interface
export interface IAttachment extends Document {
  attachmentPath: string;
  attachmentName: string;
  attachmentType: string;
  attachmentOwnership: string;
  dateTime: Date;
  userRef: mongoose.Types.ObjectId;
  size: number;
}

// Attachment Schema
const attachmentSchema: Schema<IAttachment> = new mongoose.Schema({
  attachmentPath: { type: String, required: true },
  attachmentName: { type: String, required: true },
  attachmentType: { type: String, required: true },
  attachmentOwnership: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  size: { type: Number, required: true },
});

export default attachmentSchema;
