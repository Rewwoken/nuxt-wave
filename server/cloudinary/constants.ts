export const CLOUDINARY_FOLDERS = {
	POSTS: 'posts',
	USER_IMAGES: 'user_images',
	USER_BANNERS: 'user_banners',
} as const;

export type CloudinaryFolder = (typeof CLOUDINARY_FOLDERS)[keyof typeof CLOUDINARY_FOLDERS];
