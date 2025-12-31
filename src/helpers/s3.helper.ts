import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'; // ES Modules import
import {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_REGION,
  AWS_S3_BUCKET,
  AWS_S3_SECRET_ACCESS_KEY,
} from 'src/constants/env';

const client = new S3Client({
  region: AWS_S3_REGION,
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  },
});

export const upload2S3 = async (key: string, blob: Buffer) => {
  const input = {
    ACL: 'bucket-owner-full-control' as const,
    Body: blob,
    Bucket: AWS_S3_BUCKET,
    Key: key,
  };
  const command = new PutObjectCommand(input);
  const response = await client.send(command);
  return response;
};

export const deleteFromS3 = async (key: string) => {
  const input = {
    ACL: 'bucket-owner-full-control',
    Bucket: AWS_S3_BUCKET,
    Key: key,
  };
  const command = new DeleteObjectCommand(input);
  const response = await client.send(command);
  return response;
};
