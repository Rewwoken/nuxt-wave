import { z } from 'zod';

// The shape of the user identifier in the URL param.
// If the user is found by ID, the username is optional.
// If the user is found by username, the ID is optional.

const userByIdSchema = z.object({
	id: z.string(),
	username: z.string().optional(),
});

const userByUsernameSchema = z.object({
	id: z.string().optional(),
	username: z.string(),
});

/**
 * The union of the two schemas.
 * This allows the API to accept either a user ID or a username in the URL param.
 */
export const findUserSchema = z.union([userByIdSchema, userByUsernameSchema]);

export type FindUserSchema = z.infer<typeof findUserSchema>;
