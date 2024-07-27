import crypto from 'node:crypto';
import { addMinutes } from 'date-fns';
import { prisma } from '~/server/database';

// TODO: handle expiration date
export async function createRecoveryCode(userId: string) {
  const randomCode = crypto.randomBytes(128).toString('hex');
  const expiresIn = addMinutes(new Date(), 1);

  return prisma.recoveryCode.create({
    data: {
      user: {
        connect: { id: userId },
      },
      value: randomCode,
      expiresIn,
    },
    select: {
      value: true,
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
        password: await hash(newPassword),
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
