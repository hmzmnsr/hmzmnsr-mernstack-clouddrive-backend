import express from 'express';
import multer from 'multer';
import { uploadFileController, downloadFileController, deleteFileController } from '../controllers/s3Controller';

const router = express.Router();
const upload = multer(); // Configure multer as needed

// Define routes for S3 operations
router.post('/upload', upload.single('file'), uploadFileController); // Handle file uploads
router.get('/download/:bucketName/:key', downloadFileController); // Handle file downloads
router.delete('/delete', deleteFileController); // Handle file deletions

export default router;
