import { v2 as cloudinary } from 'cloudinary';

const config = useRuntimeConfig();
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
  secure: true,
});

export function cloudinaryUpload(path: string, type: 'image' | 'video') {
  return cloudinary.uploader.upload(path, {
    resource_type: type,
  });
}

export function cloudinaryDestroy(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
