import { Request, Response } from 'express';
import { uploadFile, downloadFile, deleteFile } from '../services/s3Operations';

// Controller to handle file upload
export const uploadFileController = async (req: Request, res: Response) => {
  const { bucketName, key } = req.body;
  const fileContent = req.file?.buffer; // Assuming file is uploaded using multer

  if (!fileContent) {
    return res.status(400).send('File content is missing');
  }

  try {
    const data = await uploadFile(bucketName, key, fileContent);
    res.status(200).json({ message: 'File uploaded successfully', data });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error });
  }
};

// Controller to handle file download
export const downloadFileController = async (req: Request, res: Response) => {
  const { bucketName, key } = req.params;

  try {
    const fileData = await downloadFile(bucketName, key);
    res.status(200).send(fileData);
  } catch (error) {
    res.status(500).json({ message: 'File download failed', error });
  }
};

// Controller to handle file deletion
export const deleteFileController = async (req: Request, res: Response) => {
  const { bucketName, key } = req.body;

  try {
    await deleteFile(bucketName, key);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'File deletion failed', error });
  }
};
