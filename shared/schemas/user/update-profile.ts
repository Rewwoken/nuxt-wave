import { z } from 'zod';
import {
	PROFILE_BIO_MAX_LENGTH,
	PROFILE_LOCATION_MAX_LENGTH,
	PROFILE_NAME_MAX_LENGTH,
	PROFILE_WEBSITE_MAX_LENGTH,
} from '~/shared/profile/constants';

export const updateProfileSchema = z
	.object({
		name: z
			.string({ message: 'Name must be a string!' })
			.max(PROFILE_NAME_MAX_LENGTH, { message: `Must be less than ${PROFILE_NAME_MAX_LENGTH} characters!` })
			.optional(),
		bio: z
			.string({ message: 'Bio must be a string!' })
			.max(PROFILE_BIO_MAX_LENGTH, { message: `Must be less than ${PROFILE_BIO_MAX_LENGTH} characters!` })
			.optional(),
		location: z
			.string({ message: 'Location must be a string!' })
			.max(PROFILE_LOCATION_MAX_LENGTH, { message: `Must be less than ${PROFILE_LOCATION_MAX_LENGTH} characters!` })
			.optional(),
		website: z
			.string({ message: 'Bio must be a string!' })
			.max(PROFILE_WEBSITE_MAX_LENGTH, { message: `Must be less than ${PROFILE_WEBSITE_MAX_LENGTH} characters!` })
			.optional(),
	});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
