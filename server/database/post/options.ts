import type { Prisma } from '@prisma/client';

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
	_count: {
		select: {
			likedByUsersRelations: true, // as likes ?
			replies: true,
			reposts: true,
		},
	},
} satisfies Prisma.PostSelect;

export const PostOrder: Prisma.PostOrderByWithAggregationInput = {
	createdAt: 'desc',
};
