import { prisma } from '~/server/database';
import { cloudinaryDestroy, cloudinaryUpload } from '~/server/cloudinary';
import type { ValidatedMediaFile } from '~/server/utils/validate/mediaFiles';

export async function createPost(
	userId: string,
	parentPostId: string | undefined,
	text: string,
	files: ValidatedMediaFile[],
) {
	return prisma.$transaction(async (tx) => {
		const parentPost = { connect: { id: parentPostId } };

		const newPost = await tx.post.create({
			data: {
				user: {
					connect: { id: userId },
				},
				parentPost: parentPostId ? parentPost : undefined,
				text,
			},
			select: {
				id: true,
				text: true,
				parentPost: {
					select: {
						id: true,
						user: {
							select: {
								id: true,
								username: true,
							},
						},
					},
				},
			},
		});

		const publicIds: string[] = [];

		for (const file of files) {
			try {
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
			}
			catch (err) {
				for (const id of publicIds) {
					await cloudinaryDestroy(id).catch(); // should delete all possible instances

					await tx.mediaFile.delete({
						where: { publicId: id },
					}).catch(); // should delete all possible instances
				}

				throw err;
			}
		}

		return newPost;
	});
}
