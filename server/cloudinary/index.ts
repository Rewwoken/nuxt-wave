import { v2 } from 'cloudinary';

const config = useRuntimeConfig();

v2.config({
	cloud_name: config.cloudinaryCloudName,
	api_key: config.cloudinaryApiKey,
	api_secret: config.cloudinaryApiSecret,
});

export const cloudinary = v2;
