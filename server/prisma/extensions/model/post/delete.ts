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
