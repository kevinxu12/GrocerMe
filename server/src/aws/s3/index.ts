// eslint-disable-next-line @typescript-eslint/no-var-requires
const s3 = require('@auth0/s3');
import AWS from '../';

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
console.log('S3 client successfully instantiated');
export default client;
