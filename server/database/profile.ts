import type { ProfileSchema } from '~/schemas/profile';
import { prisma } from '~/server/database';
import { cloudinaryDestroy } from '~/server/cloudinary';

export interface FilesData {
  imageUrl?: string;
  imagePublicId?: string;
  bannerUrl?: string;
  bannerPublicId?: string;
}

export async function updateProfile(userId: string, data: ProfileSchema & FilesData) {
  if (data.imageUrl || data.bannerUrl) {
    const profile = await prisma.profile.findUniqueOrThrow({
      where: { userId },
      select: {
        imagePublicId: true,
        bannerPublicId: true,
      },
    });

    if (data.imageUrl && profile.imagePublicId) {
      await cloudinaryDestroy(profile.imagePublicId);
    }

    if (data.bannerUrl && profile.bannerPublicId) {
      await cloudinaryDestroy(profile.bannerPublicId);
    }
  }

  return prisma.profile.update({
    where: { userId },
    data,
  });
}
