import { cloudinary } from '~/server/cloudinary';

export async function uploadToCloudinary(filepath: string) {
  try {
    const response = await cloudinary.uploader.upload(filepath, {}, (err) => {
      if (err) {
        throw err;
      }
    });

    return response;
  }
  catch {
    throw createError({
      statusCode: 400,
      message: 'Error uploading to cloud!',
    });
  }
}
