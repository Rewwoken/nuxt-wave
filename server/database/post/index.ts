import type { Prisma } from '@prisma/client';

export { createPost } from '~/server/database/post/createPost';
export { checkPostLike } from '~/server/database/post/checkPostLike';
export { findPostById } from '~/server/database/post/findPostById';
export { findPostsWithLikeStatus } from '~/server/database/post/findPostsWithLikeStatus';
export { findPostWithLikeStatus } from '~/server/database/post/findPostWithLikeStatus';
export { countPostsByUserId } from '~/server/database/post/countPostsByUserId';
export { findPostsByUserId } from '~/server/database/post/findPostsByUserId';

export interface PaginationOptions {
	skip: number;
	take: number;
}

export const PostSelect = {
	id: true,
	text: true,
	createdAt: true,
	updatedAt: true,
	user: {
		select: {
			id: true,
			username: true,
			profile: {
				select: {
					name: true,
					imageUrl: true,
				},
			},
		},
	},
	mediaFiles: {
		select: {
			id: true,
			url: true,
			mimetype: true,
		},
	},
	parentPost: {
		select: {
			id: true,
			text: true,
			user: {
				select: {
					id: true,
					username: true,
				},
			},
		},
	},
	_count: {
		select: {
			likedByUsersRelations: true,
			replies: true,
			reposts: true,
		},
	},
} satisfies Prisma.PostSelect;
