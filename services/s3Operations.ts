// services/s3Operations.ts
import s3 from '../utils/s3Client';
import { PutObjectRequest, GetObjectRequest, DeleteObjectRequest } from 'aws-sdk/clients/s3';

// Upload a file
export const uploadFile = async (bucketName: string, key: string, body: Buffer | Uint8Array | Blob | string) => {
  const params: PutObjectRequest = {
    Bucket: bucketName,
    Key: key,
    Body: body,
  };

  try {
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Download a file
export const downloadFile = async (bucketName: string, key: string) => {
  const params: GetObjectRequest = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    return data.Body;
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

// Delete a file
export const deleteFile = async (bucketName: string, key: string) => {
  const params: DeleteObjectRequest = {
    Bucket: bucketName,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
