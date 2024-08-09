import mongoose, { Document, Schema } from 'mongoose';

// Folder Interface
export interface IFolder extends Document {
    userRef: mongoose.Types.ObjectId;
    path: string;
}

// Folder Schema
const folderSchema: Schema<IFolder> = new mongoose.Schema({
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    path: { type: String, required: true }
});

// Export the schema
export default folderSchema;
