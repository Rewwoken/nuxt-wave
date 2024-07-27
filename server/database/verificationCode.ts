import crypto from 'node:crypto';
import { addMinutes, isAfter } from 'date-fns';
import { prisma } from '~/server/database';

export async function createVerificationCode(userId: string) {
  const randomCode = crypto.randomBytes(128).toString('hex');
  const expiresIn = addMinutes(new Date(), 1);

  return prisma.verificationCode.create({
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

export async function verifyUser(userId: string, verificationCode: string) {
  return prisma.$transaction(async (tx) => {
    const now = new Date();

    const user = await tx.user.findUnique({
      where: {
        id: userId,
        verificationCode: { value: verificationCode },
      },
      select: {
        id: true,
        verificationCode: true,
      },
    });
    if (!user) {
      throw new Error('error/not-found');
    }

    const isExpired = isAfter(now, user.verificationCode!.expiresIn);
    if (isExpired) {
      throw new Error('error/expired');
    }

    await tx.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: now,
      },
    });

    await tx.verificationCode.delete({
      where: { userId: user.id },
    });
  });
}
