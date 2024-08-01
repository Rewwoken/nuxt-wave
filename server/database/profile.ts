import type { ProfileSchema } from '~/schemas/profile';
import { cloudinaryUpload } from '~/server/cloudinary';
import { prisma } from '~/server/database';

export async function getProfileByUserId(userId: string) {
	return prisma.profile.findUnique({
		where: { userId },
	});
}

interface UpdatedMedia {
	image?: {
		url: string;
		publicId: string;
	};
	banner?: {
		url: string;
		publicId: string;
	};
}

async function handleMediaUpload(url: string, currentPublicId: string | undefined | null) {
	const { public_id, version } = await cloudinaryUpload(url, {
		public_id: currentPublicId || undefined,
		resource_type: 'image',
	});

	return {
		publicId: public_id,
		url: `v${version}/${public_id}`,
	};
}

export async function updateProfile(userId: string, text?: ProfileSchema, imageUrl?: string, bannerUrl?: string) {
	const updatedMedia: UpdatedMedia = {};
	const profile = await getProfileByUserId(userId);

	if (imageUrl) {
		updatedMedia.image = await handleMediaUpload(imageUrl, profile?.imagePublicId);
	}

	if (bannerUrl) {
		updatedMedia.banner = await handleMediaUpload(bannerUrl, profile?.bannerPublicId);
	}

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
