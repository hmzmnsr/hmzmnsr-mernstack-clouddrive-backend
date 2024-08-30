import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

if (
  !process.env.AWS_BUCKET_NAME ||
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY
) {
  throw new Error("AWS variables are not defined");
}

const s3Client: S3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getObject = async (
  Key: string,
  ResponseContentType: string
): Promise<GetObjectCommandOutput> => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    ResponseContentType,
  });

  const response = await s3Client.send(command);

  return response;
};

export const putObject = async (
  Key: string,
  ContentType: string,
  Body: any,
  ContentDisposition?: string
): Promise<PutObjectCommandOutput> => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    ContentType,
    Body,
    ContentDisposition,
  });

  const response = await s3Client.send(command);

  return response;
};

export const getPreSignedURL = async (
  Key: string,
  ResponseContentType: string
): Promise<string> => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      ResponseContentType,
    });
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 86400 * 7,
    });
    return url;
  } catch (e) {
    return Key;
  }
};

export const putPreSignedURL = async (
  Key: string,
  ContentType: string
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    ContentType,
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 86400,
  });

  return url;
};

export const deleteObject = async (
  Key: string
): Promise<DeleteObjectCommandOutput> => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
  });

  const response = await s3Client.send(command);

  return response;
};
