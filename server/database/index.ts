import { PrismaClient } from '@prisma/client';
import { cloudinaryDestroy } from '~/server/cloudinary';

export const prisma = new PrismaClient()
// Delete related to post mediafiles from Cloudinary on post deletion
	.$extends({
		query: {
			post: {
				delete: async ({ args, query }) => {
					// Find all post related media
					const mediaFiles = await prisma.mediaFile.findMany({
						where: { postId: args.where.id },
						select: { publicId: true },
					});

					// Delete files from Cloudinary
					await Promise.all(
						mediaFiles.map(file => cloudinaryDestroy(file.publicId)),
					);

					// Perform standard post deletion after deleting files
					return query(args);
				},
			},
		},
	});
