import { cloudinaryUpload } from '~/server/cloudinary';
import type { CloudinaryFolder } from '~/server/cloudinary/constants';

/** Uploads media to Cloudinary and returns the public ID and URL. */
async function handleMediaUpload(
	url: string,
	currentPublicId: string | undefined | null,
	folder: CloudinaryFolder,
) {
	const { public_id, version } = await cloudinaryUpload(url, {
		public_id: currentPublicId || undefined,
		resource_type: 'image',
		folder,
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
	folder: CloudinaryFolder,
) {
	if (url) {
		return handleMediaUpload(url, currentPublicId, folder);
	}

	return undefined;
}
