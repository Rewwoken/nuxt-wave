import { Prisma } from '@prisma/client';
import { invalidatePostsCache } from '~/server/cache/post/manager';
import { invalidateThreadsCache } from '~/server/cache/thread/manager';

export const postQueryCreateExtension = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'postQueryCreateExtension',
		query: {
			post: {
				async create({ args, query }) {
					const createdPost = await query(args);

					const userId = args.data.user?.connect?.id;
					if (!userId) {
						throw new Error('User ID connection is required!');
					}

					const isReply = !!(args.data.parentPost || args.data.rootPost);
					await (isReply ? invalidateThreadsCache : invalidatePostsCache)(userId);

					return createdPost;
				},
			},
		},
	});
});
