import { Prisma } from '@prisma/client';
// import { invalidatePostsCache } from '~/server/cache/post/manager';
// import { invalidateThreadsCache } from '~/server/cache/thread/manager';

export const postQueryDeleteExtension = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'postQueryDeleteExtension',
		query: {
			post: {
				// TODO: invalidate cache
				// delete: async ({ args, query }) => {},
			},
		},
	});
});
