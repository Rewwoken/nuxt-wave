import argon2 from 'argon2';
import { prisma } from '~/server/database';

export async function createUser(data: any) {
  data.password = await argon2.hash(data.password);

  return await prisma.user.create({ data });
}

export async function findUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
  });
}

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}
