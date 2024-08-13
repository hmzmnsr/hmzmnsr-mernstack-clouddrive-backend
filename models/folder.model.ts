import mongoose from "mongoose";
import folderSchema, { IFolder } from "../schemas/folder.schema";

folderSchema.pre("save", async function (next) {
  const FolderModel = mongoose.model("Folders");

  const duplicate = await FolderModel.exists({
    path: this.path,
    userRef: this.userRef,
  });

  if (duplicate) {
    throw new Error("Folder already exists at this path");
  }

  next();
});

const FolderModel = mongoose.model<IFolder>("Folders", folderSchema);
export { FolderModel, IFolder };
