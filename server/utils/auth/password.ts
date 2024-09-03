import argon2 from 'argon2';

export async function hashPassword(raw: string) {
	return await argon2.hash(raw);
}

export async function verifyPassword(hash: string, raw: string) {
	return await argon2.verify(hash, raw);
}
