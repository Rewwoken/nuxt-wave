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
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: `error/${name}-no-filepath`,
		});
	}

	if (!mimetype || !MIMES.includes(mimetype)) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: `error/${name}-invalid-type`,
		});
	}

	if (size > 15_728_640) { // 15mb
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: `error/${name}-size`,
		});
	}
}
