export const CLOUDINARY_FOLDERS = {
	POSTS: 'posts',
	USERS: 'users',
} as const;

export type CloudinaryFolder = (typeof CLOUDINARY_FOLDERS)[keyof typeof CLOUDINARY_FOLDERS];
