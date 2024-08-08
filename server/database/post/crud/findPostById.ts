import { prisma } from '~/server/database';
import { PostSelect } from '~/server/database/post/miscellaneous';

export function findPostById(id: string) {
	return prisma.post.findUnique({
		where: { id },
		select: PostSelect,
	});
}
