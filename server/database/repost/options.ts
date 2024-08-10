import type { Prisma } from '@prisma/client';

export const repostSelect: Prisma.RepostSelect = {
	id: true,
	text: true,
	createdAt: true,
	post: {
		select: {
			id: true,
			text: true,
			user: {
				select: {
					id: true,
					username: true,
					profile: {
						select: {
							name: true,
						},
					},
				},
			},
		},
	},
};
