import mongoose, { Document, Schema } from 'mongoose';

// Folder Interface
export interface IFolder extends Document {
    path: string;
    name: string;  
}

// Folder Schema
const folderSchema: Schema<IFolder> = new mongoose.Schema({
    path: { type: String, required: true },
    name: { type: String, required: true }  
});

// Export the schema
export default folderSchema;
