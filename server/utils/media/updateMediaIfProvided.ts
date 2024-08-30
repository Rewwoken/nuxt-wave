import { cloudinaryUpload } from '~/server/cloudinary';
import { CLOUDINARY_FOLDERS } from '~/server/cloudinary/constants';

/** Uploads media to Cloudinary and returns the public ID and URL. */
async function handleMediaUpload(url: string, currentPublicId: string | undefined | null) {
	const { public_id, version } = await cloudinaryUpload(url, {
		public_id: currentPublicId || undefined,
		folder: CLOUDINARY_FOLDERS.USERS,
		resource_type: 'image',
	});

	return {
		publicId: public_id,
		url: `v${version}/${public_id}`,
	};
}

/** Updates media if a new URL is provided. */
export async function updateMediaIfProvided(
	url: string | undefined,
	currentPublicId: string | undefined | null,
) {
	if (url) {
		return handleMediaUpload(url, currentPublicId);
	}

	return undefined;
}
