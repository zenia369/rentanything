import { writeAsyncIterableToWritable } from "@remix-run/node";
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME_UP,
  api_key: process.env.CLOUDINARY_API_KEY_UP,
  api_secret: process.env.CLOUDINARY_API_SECRET_UP,
});

export const uploadImage = async (
  data: AsyncIterable<Uint8Array>,
  folder = "rentanything_project"
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  // eslint-disable-next-line no-async-promise-executor
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, unique_filename: true },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });

  return uploadPromise as Promise<UploadApiResponse | UploadApiErrorResponse>;
};
