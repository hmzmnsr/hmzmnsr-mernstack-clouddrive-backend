import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { FolderModel } from "../models/folder.model";


// Middleware to check for duplicate folders
export const checkDuplicateFolder = async (req: Request, res: Response, next: NextFunction) => {
    const FolderModel = mongoose.model('Folder');
    const existingFolder = await FolderModel.findOne({ userRef: req.body.userRef, path: req.body.path });

    if (existingFolder) {
        return res.status(400).send("Folder already exists at this path");
    }

    next();
};