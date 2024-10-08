import { prisma } from '~/server/prisma';

export async function deletePost(id: string) {
	return await prisma.$transaction(async (tx) => {
		try {
			return await tx.post.deleteWithMediaFiles(id);
		}
		catch {
			throw new Error('error/unknown');
		}
	});
}
