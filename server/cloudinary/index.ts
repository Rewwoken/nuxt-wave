import { v2 as cloudinary } from 'cloudinary';

const config = useRuntimeConfig();
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
  secure: true,
});

export function cloudinaryUpload(source: string) {
  return cloudinary.uploader.upload(source);
}

export function cloudinaryDestroy(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
