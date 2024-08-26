import type { Prisma } from '@prisma/client';

export const UserSelect = {
	id: true,
	username: true,
	createdAt: true,
	profile: {
		select: {
			name: true,
			bio: true,
			location: true,
			website: true,
			imageUrl: true,
			bannerUrl: true,
		},
	},
} satisfies Prisma.UserSelect;
