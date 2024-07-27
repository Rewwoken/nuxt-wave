import type { ProfileSchema } from '~/schemas/profile';
import { prisma } from '~/server/database';
import { cloudinary } from '~/server/cloudinary';

export interface FilesData {
  imageUrl?: string;
  imageProviderId?: string;
  bannerUrl?: string;
  bannerProviderId?: string;
}

export async function updateProfile(userId: string, data: ProfileSchema & FilesData) {
  if (data.imageUrl || data.bannerUrl) {
    const profile = await prisma.profile.findUniqueOrThrow({
      where: { userId },
    });

    if (data.imageUrl && profile.imageProviderId) {
      await cloudinary.uploader.destroy(profile.imageProviderId);
    }

    if (data.bannerUrl && profile.bannerProviderId) {
      await cloudinary.uploader.destroy(profile.bannerProviderId);
    }
  }

  return prisma.profile.update({
    where: { userId },
    data,
  });
}
