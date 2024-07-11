import { prisma } from '~/server/database';

export default defineEventHandler(async (event) => {
	const params = getRouterParams(event);

	return await prisma.post.findUnique({
		where: { id: params.id },
		include: {
			mediaFiles: true,
			replies: true,
			replyTo: true,
		},
	});
});
