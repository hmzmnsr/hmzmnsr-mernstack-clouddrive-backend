import mongoose from "mongoose";
import folderSchema, { IFolder } from "../schemas/folder.schema";

// Create Folder model
const FolderModel = mongoose.model<IFolder>("Folder", folderSchema);

export { FolderModel, IFolder };
