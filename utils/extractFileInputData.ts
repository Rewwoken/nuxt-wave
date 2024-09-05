export function extractFileInputData(event: Event) {
	const target = event.target;

	if (target instanceof HTMLInputElement === false) {
		throw new TypeError('Target is not an HTMLInputElement!');
	}

	if (target.files === null) {
		throw new TypeError('Target files is null!');
	}

	const file = target.files[0];

	return { file, mimetype: file.type };
}
