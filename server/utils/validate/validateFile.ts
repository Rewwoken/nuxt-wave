import type formidable from 'formidable';

export interface ValidatedFormFile {
	filepath: string;
	type: 'image' | 'video';
	mimetype: string;
}

export function validateFormFile(
	file: formidable.File,
	allowedMimes: Readonly<string[]>,
	maxSize: number,
): ValidatedFormFile {
	const { filepath, mimetype, size } = file;

	if (!filepath) {
		throw serverError(400, 'no-filepath');
	}

	if (!mimetype || !allowedMimes.includes(mimetype)) {
		throw serverError(400, 'invalid-type');
	}

	if (size > maxSize) {
		throw serverError(400, 'size');
	}

	const type = mimetype.startsWith('image/') ? 'image' : 'video';
	return { filepath, mimetype, type };
}

export function validateFormFiles(
	files: formidable.Files<string>,
	allowedMimes: Readonly<string[]>,
	maxSize: number,
): ValidatedFormFile[] {
	const result: ValidatedFormFile[] = [];

	for (const fileName in files) {
		const file = files[fileName]![0];

		const validatedFile = validateFormFile(file, allowedMimes, maxSize);
		result.push(validatedFile);
	}

	return result;
}
