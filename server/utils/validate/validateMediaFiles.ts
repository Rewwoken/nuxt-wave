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
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'error/invalid-type',
			});
		}
		const type = mimetype.split('/')[0] as 'image' | 'video';

		if (size > 15_728_640) { // 15mb
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'error/size',
			});
		}

		result.push({ filepath, mimetype, type });
	}

	return result;
}
