import type { UploadApiOptions } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import type { CloudinaryFolder } from '~/server/cloudinary/constants';

const config = useRuntimeConfig();
cloudinary.config({
	cloud_name: config.cloudinaryCloudName,
	api_key: config.cloudinaryApiKey,
	api_secret: config.cloudinaryApiSecret,
	secure: true,
});

interface Options extends UploadApiOptions {
	resource_type: 'image' | 'video';
	folder: CloudinaryFolder;
}

export function cloudinaryUpload(path: string, options: Options) {
	return cloudinary.uploader.upload(path, options);
}

export function cloudinaryDestroy(publicId: string) {
	return cloudinary.uploader.destroy(publicId);
}
