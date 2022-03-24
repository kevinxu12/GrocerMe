/**
 * @file Test file for S3 helpers
 * @author Kevin Xu
 */

import asyncHandler from '@src/helpers/asyncHandler';
import express, { Request } from 'express';
import { uploadImage } from '@src/aws/s3';
import { SuccessResponse } from '@src/core/ApiResponse';
const router = express.Router();

router.post(
  '/images',
  asyncHandler(async (req: Request<unknown, unknown, any>, res) => {
    const base64Image = req.body.image;
    const imageName = req.body.name;
    const imageURL = await uploadImage(imageName, base64Image);
    return new SuccessResponse<string | null>('Uploaded Item', imageURL).send(res);
  }),
);

export default router;
