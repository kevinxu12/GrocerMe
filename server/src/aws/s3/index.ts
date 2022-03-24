/**
 * @file Generating S3 client with base AWS config
 * @author Kevin Xu
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const s3 = require('@auth0/s3');
import { environment, image_bucket_name } from '@src/config';
import logger from '@src/core/logger';
import AWS from '../';

/* eslint-disable jsdoc/require-returns-type */
/**
 *
 * @returns Returns a new aws s3 client
 */
const awsS3Client = new AWS.S3();
const options = {
  s3Client: awsS3Client,
  maxAsyncS3: 20, // this is the default
  s3RetryCount: 1, // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
};
const client = s3.createClient(options);
/**
 * Uploads a PNG image to S3
 *
 * @param {string} imageName image name
 * @param {string | null} base64Image base64 image string
 * @param {string} type Image file type
 * @returns {Promise} signed url of the uploaded image
 */
export async function uploadImage(
  imageName: string,
  base64Image: string | null,
  type = 'image/png',
): Promise<string | null> {
  if (base64Image) {
    const acl = environment === 'test' ? 'private' : 'public-read';
    const params: AWS.S3.PutObjectRequest = {
      ACL: acl,
      Bucket: image_bucket_name,
      Key: `${imageName}`,
      Body: Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
      ContentType: type,
      ContentEncoding: 'base64',
    };
    const data = await promiseUpload(params);
    return data.Location;
    // const signedParams = {
    //   Bucket: image_bucket_name,
    //   Key: `${imageName}`,
    // }
    // const signedUrl = await awsS3Client.getSignedUrlPromise('getObject', signedParams);
    // return signedUrl;
  }
  return null;
}
logger.info('S3 client successfully instantiated');
export default client;

/**
 * Upload to S3 in a promise format
 *
 * @param {AWS.S3.PutObjectRequest} params S3 bucket params
 * @returns {Promise} data/err S3 response object
 */
function promiseUpload(params: AWS.S3.PutObjectRequest): Promise<AWS.S3.ManagedUpload.SendData> {
  return new Promise(function (resolve, reject) {
    awsS3Client.upload(params, function (err: any, data: AWS.S3.ManagedUpload.SendData) {
      if (err) {
        // eslint-disable-next-line prettier/prettier
                reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
