import { createUser } from '~/server/database/user';

interface RegisterBody {
	name: string;
	username: string;
	email: string;
	image: string;
	password: string;
}
export default defineEventHandler(async (event) => {
	const body: RegisterBody = await readBody(event);

	// TODO: BODY VALIDATION...

	const { username, email, password } = body;
	if (!username || !email || !password) {
		throw createError({
			statusCode: 400,
			message: 'Invalid data!',
		});
	}

	const user = await createUser(body);

	return user;
});
