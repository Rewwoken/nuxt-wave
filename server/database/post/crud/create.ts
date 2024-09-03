import { prisma } from '~/server/prisma';
import type { CreatePostData } from '~/server/types/post.types';

export async function createPost(data: CreatePostData) {
	return await prisma.$transaction(async (tx) => {
		try {
			return await tx.post.createWithMediaFiles(data);
		}
		catch {
			throw new Error('error/unknown');
		}
	});
}
