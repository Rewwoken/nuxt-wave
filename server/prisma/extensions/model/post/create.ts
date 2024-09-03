import { Prisma } from '@prisma/client';
import { cloudinaryUpload } from '~/server/cloudinary';
import { CLOUDINARY_FOLDERS } from '~/server/cloudinary/constants';
import type { CreatePostData } from '~/server/types/post.types';

export const postModelCreateExtension = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'postModelCreateExtension',
		model: {
			post: {
				async createWithMediaFiles(data: CreatePostData) {
					const context = Prisma.getExtensionContext(this);

					const newPost = await client.post.create({
						data: {
							user: { connect: { id: data.userId } },
							parentPost: data.parentId ? { connect: { id: data.parentId } } : undefined,
							rootPost: data.rootId ? { connect: { id: data.rootId } } : undefined,
							text: data.text,
						},
						select: { id: true },
					});

					const mediaFilesPromises = data.files.map(
						async (file) => {
							return await context.createPostMediaFileWithCloudinary(newPost.id, file);
						},
					);

					try {
						const mediaFiles = await Promise.all(mediaFilesPromises);
						return Object.assign(newPost, { mediaFiles });
					}
					catch (err) {
						console.error('Error creating post media files:', err);
						throw new Error('Failed to create post media files!');
					}
				},
				async createPostMediaFileWithCloudinary(postId: string, file: ValidatedFormFile) {
					const { public_id, version } = await cloudinaryUpload(file.filepath, {
						folder: CLOUDINARY_FOLDERS.POSTS,
						resource_type: file.type,
					});

					return await client.mediaFile.create({
						data: {
							postId,
							publicId: public_id,
							url: `v${version}/${public_id}`,
							mimetype: file.mimetype,
						},
					});
				},
			},
		},
	});
});
