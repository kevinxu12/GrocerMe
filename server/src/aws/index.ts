/**
 * @file Top-level config of AWS
 * @author Kevin Xu
 */
import AWS from 'aws-sdk';
import { logger } from './../app';
import { aws } from '../config';

//configuring the AWS environment
AWS.config.update({
  accessKeyId: aws.access_key_id,
  secretAccessKey: aws.secret_access_key,
});
logger.info('AWS config updated');
export default AWS;
