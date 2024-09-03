import { prisma } from '~/server/prisma';

export async function countPostsByUserId(userId: string) {
	return await prisma.post.count({
		where: {
			user: { id: userId },
			parentPost: { is: null },
		},
	});
}

// Not supported yet: https://github.com/prisma/prisma/issues/4228
// export function countThreadsByUserId(userId: string) {
// 	return await prisma.post.count({
// 		where: {
// 			user: { id: userId },
// 			parentPost: { isNot: null },
// 			rootPost: { isNot: null },
// 		},
// 		distinct: ['rootPostId'],
// 	});
// }

// So use this one https://github.com/prisma/prisma/issues/4228#issuecomment-1405042711
export async function countThreadsByUserId(userId: string) {
	const results = await prisma.post.findMany({
		where: {
			user: { id: userId },
			parentPost: { isNot: null },
			rootPost: { isNot: null },
		},
		distinct: ['rootPostId'],
	});

	return results.length;
}
