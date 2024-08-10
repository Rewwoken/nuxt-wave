import { z } from 'zod';

export const updateProfileSchema = z
	.object({
		name: z
			.string({ message: 'Name must be a string!' })
			.max(50, { message: 'Must be less than 50 characters!' })
			.optional(),
		bio: z
			.string({ message: 'Bio must be a string!' })
			.max(160, { message: 'Must be less than 160 characters!' })
			.optional(),
		location: z
			.string({ message: 'Location must be a string!' })
			.max(30, { message: 'Must be less than 30 characters!' })
			.optional(),
		website: z
			.string({ message: 'Bio must be a string!' })
			.max(50, { message: 'Must be less than 50 characters!' })
			.optional(),
	});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
