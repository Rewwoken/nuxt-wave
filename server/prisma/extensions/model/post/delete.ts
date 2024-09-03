import { Prisma } from '@prisma/client';
import { cloudinaryDestroy } from '~/server/cloudinary';

export const postModelDeleteExtension = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'postModelDeleteExtension',
		model: {
			post: {
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
							return await context.deletePostMediaFileWithCloudinary(file.id);
						},
					);

					try {
						await Promise.all(mediaFilesPromises);
					}
					catch (err) {
						console.error('Error deleting post media files:', err);
						throw new Error('Failed to delete post media files!');
					}

					return deletedPost;
				},
				async deletePostMediaFileWithCloudinary(id: string) {
					const deletedMediaFile = await client.mediaFile.delete({
						where: { id },
						select: { publicId: true },
					});

					try {
						await cloudinaryDestroy(deletedMediaFile.publicId);
					}
					catch (err) {
						console.error('Error deleting media file from Cloudinary:', err);
						throw new Error('Failed to delete media file from Cloudinary!');
					}
				},
			},
		},
	});
});
