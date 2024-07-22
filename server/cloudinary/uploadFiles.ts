import type formidable from 'formidable';
import { uploadFile } from '~/server/cloudinary/uploadFile';

export async function uploadFiles(files: formidable.Files<string>) {
  try {
    const fileNames = Object.keys(files);
    const filePromises = fileNames.map(async (fileName) => {
      const file = files[fileName]![0];

      return uploadFile(file.filepath);
    });

    return await Promise.all(filePromises);
  }
  catch {
    throw createError({
      statusCode: 500,
      message: 'Error uploading to cloud!',
    });
  }
}
