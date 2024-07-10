import { findUserById } from '~/server/database/user';

// TODO: exclude password hash
export default defineEventHandler(async (event) => {
	return await findUserById(event.context.userId);
});
