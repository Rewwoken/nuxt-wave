import type formidable from 'formidable';

const MIMES = ['image/png', 'image/jpeg', 'image/webp'];
export function validateProfileFiles(image: formidable.File | undefined, banner: formidable.File | undefined) {
	if (image) {
		validateFile(image, 'image');
	}

	if (banner) {
		validateFile(banner, 'banner');
	}

	return {
		image: image?.filepath,
		banner: banner?.filepath,
	};
}

function validateFile(file: formidable.File, name: string) {
	const { filepath, mimetype, size } = file;

	if (!filepath) {
		const message = `error/${name}-no-filepath`;
		throw serverError(400, message);
	}

	if (!mimetype || !MIMES.includes(mimetype)) {
		const message = `error/${name}-invalid-type`;
		throw serverError(400, message);
	}

	if (size > 15_728_640) { // 15mb
		const message = `error/${name}-size`;
		throw serverError(400, message);
	}
}
