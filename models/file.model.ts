import mongoose from "mongoose";
import fileSchema, { IFile } from "../schemas/file.schema";
import { AttachmentModel } from "./attachment.model";

// Pre-save hook to ensure attachment exists
fileSchema.pre<IFile>("save", async function (next) {
  const attachmentExists = await AttachmentModel.exists({
    _id: this.attachmentRef,
  });
  if (!attachmentExists) {
    throw new Error("Referenced attachment does not exist");
  }
  next();
});

const FileModel = mongoose.model<IFile>("File", fileSchema);
export { FileModel, IFile };
