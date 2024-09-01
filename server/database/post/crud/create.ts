import { prisma } from '~/server/prisma';
import type { CreatePostArgs } from '~/server/types/post.types';

export async function createPost(args: CreatePostArgs) {
	return prisma.$transaction(async (tx) => {
		try {
			return await tx.post.createWithMediaFiles(args);
		}
		catch {
			throw new Error('error/unknown');
		}
	});
}
