import crypto from 'node:crypto';
import argon2 from 'argon2';
import { prisma } from '~/server/database/index';

export async function createRecoveryCode(userId: string) {
  const randomCode = crypto.randomBytes(128).toString('hex');

  return prisma.recoveryCode.create({
    data: {
      value: randomCode,
      user: {
        connect: { id: userId },
      },
    },
  });
}

export async function recoverUserPassword(userId: string, newPassword: string, recoveryCode: string) {
  return prisma.$transaction([
    prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
        recoveryCode: { value: recoveryCode },
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        password: await argon2.hash(newPassword),
      },
    }),
    prisma.recoveryCode.delete({
      where: {
        userId,
        value: recoveryCode,
      },
    }),
  ]);
}
