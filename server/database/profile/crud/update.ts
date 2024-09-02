import { prisma } from '~/server/prisma';
import { findProfileByUserId } from '~/server/database/profile/crud/read';
import { CLOUDINARY_FOLDERS } from '~/server/cloudinary/constants';

interface MediaInfo {
	url: string;
	publicId: string;
}

interface UpdatedMedia {
	image: MediaInfo | undefined;
	banner: MediaInfo | undefined;
}

export async function updateProfile(userId: string, text?: UpdateProfileSchema, imageUrl?: string, bannerUrl?: string) {
	const profile = await findProfileByUserId(userId);

	const updatedMedia: UpdatedMedia = {
		image: await updateMediaIfProvided(imageUrl, profile?.imagePublicId, CLOUDINARY_FOLDERS.USER_IMAGES),
		banner: await updateMediaIfProvided(bannerUrl, profile?.bannerPublicId, CLOUDINARY_FOLDERS.USER_BANNERS),
	};

	return prisma.profile.update({
		where: { userId },
		data: {
			...text,
			imageUrl: updatedMedia.image?.url,
			imagePublicId: updatedMedia.image?.publicId,
			bannerUrl: updatedMedia.banner?.url,
			bannerPublicId: updatedMedia.banner?.publicId,
		},
	});
}
