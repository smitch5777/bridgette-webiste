import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME;

export const getS3Folders = async () => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Delimiter: '/',
    });

    const response = await s3Client.send(command);
    
    if (response.CommonPrefixes) {
      return response.CommonPrefixes.map(prefix => 
        prefix.Prefix.replace('/', '')
      );
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching S3 folders:', error);
    return [];
  }
};

export const getS3Images = async (folderName) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `${folderName}/`,
    });

    const response = await s3Client.send(command);
    
    if (response.Contents) {
      return response.Contents
        .filter(item => {
          const extension = item.Key.split('.').pop().toLowerCase();
          return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
        })
        .map(item => ({
          key: item.Key,
          url: `https://${BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_REGION || 'us-east-1'}.amazonaws.com/${item.Key}`,
          lastModified: item.LastModified,
          size: item.Size,
        }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching S3 images:', error);
    return [];
  }
};

export const getImageMetadata = (imageKey) => {
  const parts = imageKey.split('/');
  const filename = parts[parts.length - 1];
  const nameWithoutExtension = filename.split('.')[0];
  
  return {
    title: nameWithoutExtension.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    filename: filename,
  };
};