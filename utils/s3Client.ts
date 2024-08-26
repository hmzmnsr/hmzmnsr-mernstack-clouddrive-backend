// utils/s3Client.ts
import AWS from 'aws-sdk';

// Configure the S3 client
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
});

export default s3;
