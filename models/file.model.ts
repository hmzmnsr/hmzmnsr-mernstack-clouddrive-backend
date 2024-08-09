import mongoose from "mongoose";
import fileSchema, { IFile } from "../schemas/file.schema";

fileSchema.pre<IFile>("save", async function (next) {
  
  const fileExists = await mongoose.model("File").exists({ _id: this.fileRef });
  if (!fileExists) {
    throw new Error("Referenced file does not exist");
  }
  next();
});

const FileModel = mongoose.model<IFile>("File", fileSchema);
export { IFile, FileModel };
