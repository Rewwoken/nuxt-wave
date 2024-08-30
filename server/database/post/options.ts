import type { Prisma } from '@prisma/client';

export interface PaginationOptions {
	skip: number;
	take: number;
}

export const mediaFileSelect = {
	id: true,
	url: true,
	mimetype: true,
} satisfies Prisma.MediaFileSelect;

export const mediaFileOrder = {
	createdAt: 'desc',
} satisfies Prisma.MediaFileOrderByWithAggregationInput;

export const postSelect = {
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
		select: mediaFileSelect,
		orderBy: mediaFileOrder,
	},
	_count: {
		select: {
			likes: true,
			replies: true,
			// reposts: true,
		},
	},
} satisfies Prisma.PostSelect;

export const postsOrder: Prisma.PostOrderByWithAggregationInput = {
	createdAt: 'desc',
};
