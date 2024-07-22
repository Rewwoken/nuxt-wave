import { cloudinary } from '~/server/cloudinary/index';

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
      message: 'Error uploading to cloud!',
    });
  }
}
