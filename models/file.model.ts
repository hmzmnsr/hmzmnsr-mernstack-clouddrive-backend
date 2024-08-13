import mongoose from "mongoose";
import fileSchema, { IFile } from "../schemas/file.schema";

fileSchema.pre<IFile>("save", async function (next) {
  const attachmentExists = await mongoose
    .model("File")
    .exists({ _id: this.attachmentRef });
  if (!attachmentExists) {
    throw new Error("Referenced attachment does not exist");
  }
  next();
});

const FileModel = mongoose.model<IFile>("File", fileSchema);
export { FileModel, IFile };
