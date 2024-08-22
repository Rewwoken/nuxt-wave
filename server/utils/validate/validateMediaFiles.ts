import type formidable from 'formidable';

export interface ValidatedMediaFile {
	filepath: string;
	type: 'image' | 'video';
	mimetype: string;
}

export function validateMediaFiles(files: formidable.Files<string>) {
	const result: ValidatedMediaFile[] = [];

	for (const fileName in files) {
		const { filepath, mimetype, size } = files[fileName]![0];

		if (!mimetype || (!mimetype.startsWith('video/') && !mimetype.startsWith('image/'))) {
			throw serverError(400, 'invalid-type');
		}

		if (size > 15_728_640) { // 15mb
			throw serverError(400, 'size');
		}

		const type = mimetype.split('/')[0] as 'image' | 'video';
		result.push({ filepath, mimetype, type });
	}

	return result;
}
