import type { ProfileSchema } from '~/schemas/profile';
import { prisma } from '~/server/database';
import { findUserById } from '~/server/database/user';
import { cloudinary } from '~/server/cloudinary';

export interface FilesData {
  imageUrl?: string;
  imageProviderId?: string;
  bannerUrl?: string;
  bannerProviderId?: string;
}

export async function updateProfile(userId: string, data: ProfileSchema & FilesData) {
  if (data.imageUrl || data.bannerUrl) {
    const user = await findUserById(userId);

    if (data.imageUrl && user.profile.imageProviderId) {
      await cloudinary.uploader.destroy(user.profile.imageProviderId);
    }

    if (data.bannerUrl && user.profile.bannerProviderId) {
      await cloudinary.uploader.destroy(user.profile.bannerProviderId);
    }
  }

  return prisma.profile.update({
    where: { userId },
    data,
  });
}
