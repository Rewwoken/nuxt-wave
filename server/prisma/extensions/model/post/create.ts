import { Prisma } from '@prisma/client';
import { cloudinaryDestroy, cloudinaryUpload } from '~/server/cloudinary';
import { CLOUDINARY_FOLDERS } from '~/server/cloudinary/constants';
import type { CreatePostArgs } from '~/server/types/post.types';

export const postModelCreateExtension = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'postModelCreateExtension',
		model: {
			post: {
				async createWithMediaFiles(args: CreatePostArgs) {
					const context = Prisma.getExtensionContext(this);

					const newPost = await client.post.create({
						data: {
							user: { connect: { id: args.userId } },
							parentPost: args.parentId ? { connect: { id: args.parentId } } : undefined,
							rootPost: args.rootId ? { connect: { id: args.rootId } } : undefined,
							text: args.text,
						},
						select: { id: true },
					});

					const mediaFilesPromises = args.files.map(
						async (file) => {
							return context.createPostMediaFileWithCloudinary(newPost.id, file);
						},
					);

					const mediaFiles = await Promise.all(mediaFilesPromises);

					// if (args.parentId) {
					// 	await invalidateThreadsCache(args.userId);
					// }
					// else {
					// 	await invalidatePostsCache(args.userId);
					// }

					return Object.assign(newPost, { mediaFiles });
				},
				async createPostMediaFileWithCloudinary(postId: string, file: ValidatedFormFile) {
					const { public_id, version } = await cloudinaryUpload(file.filepath, {
						folder: CLOUDINARY_FOLDERS.POSTS,
						resource_type: file.type,
					});

					return client.mediaFile.create({
						data: {
							postId,
							publicId: public_id,
							url: `v${version}/${public_id}`,
							mimetype: file.mimetype,
						},
					});
				},
				async deleteWithMediaFiles(id: string) {
					const deletedPost = await client.post.delete({
						where: { id },
						select: {
							mediaFiles: {
								select: { id: true },
							},
						},
					});

					const context = Prisma.getExtensionContext(this);
					const mediaFilesPromises = deletedPost.mediaFiles.map(
						async (file) => {
							return context.deletePostMediaFileWithCloudinary(file.id);
						},
					);

					await Promise.all(mediaFilesPromises);

					return deletedPost;
				},
				async deletePostMediaFileWithCloudinary(id: string) {
					const deletedMediaFile = await client.mediaFile.delete({
						where: { id },
						select: { publicId: true },
					});

					await cloudinaryDestroy(deletedMediaFile.publicId);
				},
			},
		},
	});
});
