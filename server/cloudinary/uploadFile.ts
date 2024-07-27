import { cloudinary } from '~/server/cloudinary';

export async function uploadFile(filepath: string) {
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
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Error uploading to cloud!',
    });
  }
}
