import crypto from 'node:crypto';
import { prisma } from '~/server/database/index';

export async function createVerificationCode(userId: string) {
  const randomCode = crypto.randomBytes(128).toString('hex');

  return prisma.verificationCode.create({
    data: {
      value: randomCode,
      user: {
        connect: { id: userId },
      },
    },
  });
}

export async function deleteVerificationCode(id: string) {
  return prisma.verificationCode.delete({
    where: { id },
  });
}
