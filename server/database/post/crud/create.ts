import { prisma } from '~/server/database';

export async function createPost(
	userId: string,
	rootId: string | null,
	parentId: string | null,
	text: string,
	files: ValidatedFormFile[],
) {
	return prisma.$transaction(async (tx) => {
		const newPost = await tx.post.create({
			data: {
				user: { connect: { id: userId } },
				parentPost: parentId
					? ({ connect: { id: parentId } })
					: undefined,
				rootPost: rootId
					? ({ connect: { id: rootId } })
					: undefined,
				text,
			},
			select: { id: true },
		});

		try {
			await tx.post.createMediaFiles(newPost.id, files);
		}
		catch {
			await tx.post.deleteMediaFiles(newPost.id);
			throw new Error('error/unknown');
		}

		return newPost;
	});
}
