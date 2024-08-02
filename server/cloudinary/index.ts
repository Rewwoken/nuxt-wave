import type { UploadApiOptions } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const config = useRuntimeConfig();
cloudinary.config({
	cloud_name: config.cloudinaryCloudName,
	api_key: config.cloudinaryApiKey,
	api_secret: config.cloudinaryApiSecret,
	secure: true,
});

interface RequiredOptions {
	resource_type: 'image' | 'video';
}

export function cloudinaryUpload(path: string, options: RequiredOptions & UploadApiOptions) {
	return cloudinary.uploader.upload(path, options);
}

export function cloudinaryDestroy(publicId: string) {
	return cloudinary.uploader.destroy(publicId);
}
