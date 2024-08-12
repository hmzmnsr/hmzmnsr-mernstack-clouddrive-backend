import mongoose from 'mongoose';
import folderSchema, { IFolder } from '../schemas/folder.schema';

folderSchema.pre("save", async function (next) {
  const FolderModel = mongoose.model('Folder');
  const duplicate = await FolderModel.exists({ path: this.path });
  if (duplicate) {
    throw new Error("Folder already exists at this path");
  }
  next();
});

const FolderModel = mongoose.model<IFolder>('Folder', folderSchema);
export { IFolder, FolderModel };
