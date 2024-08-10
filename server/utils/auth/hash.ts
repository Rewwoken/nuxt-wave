import argon2 from 'argon2';

export async function hash(value: string) {
	return argon2.hash(value);
}
