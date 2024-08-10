import { prisma } from '~/server/database';
import { cloudinaryDestroy, cloudinaryUpload } from '~/server/cloudinary';
import type { ValidatedMediaFile } from '~/server/utils/validate/validateMediaFiles';
import { PostSelect } from '~/server/database/post/options';

export async function createPost(
	userId: string,
	parentPostId: string | undefined,
	text: string,
	files: ValidatedMediaFile[],
) {
	return prisma.$transaction(async (tx) => {
		const newPost = await tx.post.create({
			data: {
				user: { connect: { id: userId } },
				parentPost: parentPostId ? { connect: { id: parentPostId } } : undefined,
				text,
			},
			select: PostSelect,
		});

		// Safely upload all files to Cloudinary and create mediaFile records in the database
		const publicIds: string[] = [];

		try {
			const uploadPromises = files.map(
				async (file) => {
					const { public_id, version } = await cloudinaryUpload(file.filepath, {
						resource_type: file.type,
					});
					publicIds.push(public_id);

					await tx.mediaFile.create({
						data: {
							post: { connect: { id: newPost.id } },
							publicId: public_id,
							url: `v${version}/${public_id}`,
							mimetype: file.mimetype,
						},
					});
				},
			);

			await Promise.all(uploadPromises);
		}
		catch (err) {
			// If there is an error, attempt to roll back by deleting uploaded files from Cloudinary and database records
			const rollbackPromises = publicIds.map(
				async (id) => {
					// Use .catch() to ensure the deletion attempt is made in the database even if Cloudinary deletion fails
					await cloudinaryDestroy(id).catch();

					await tx.mediaFile.delete({
						where: { publicId: id },
					}).catch(); // You can add error logger during develompent
				},
			);

			await Promise.allSettled(rollbackPromises);
			throw err;
		}

		return newPost;
	});
}
