import type formidable from 'formidable';

const ALLOWED_MIMES = ['image/png', 'image/jpeg', 'image/webp'] as const;
const MAX_FILE_SIZE = 15_728_640; // 15mb

export function validateProfileFiles(files: formidable.Files) {
	const { image, banner } = files;

	let imageFile: ValidatedFormFile | undefined;
	let bannerFile: ValidatedFormFile | undefined;

	if (image && image[0]) {
		imageFile = validateFormFile(image[0], ALLOWED_MIMES, MAX_FILE_SIZE);
	}

	if (banner && banner[0]) {
		bannerFile = validateFormFile(banner[0], ALLOWED_MIMES, MAX_FILE_SIZE);
	}

	return {
		imageFilepath: imageFile?.filepath,
		bannerFilepath: bannerFile?.filepath,
	};
}
