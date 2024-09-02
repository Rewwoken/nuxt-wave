import argon2 from 'argon2';

export async function hashPassword(raw: string) {
	return argon2.hash(raw);
}

export async function verifyPassword(hash: string, raw: string) {
	return argon2.verify(hash, raw);
}
