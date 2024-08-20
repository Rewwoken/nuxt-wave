export function handleFileChange(event: Event) {
	const target = event.target;

	if (target instanceof HTMLInputElement === false) {
		throw new TypeError('Target is not an HTMLInputElement');
	}

	if (target.files === null) {
		throw new TypeError('Target files is null');
	}

	const file = target.files[0];
	const url = URL.createObjectURL(file);

	return { file, mimetype: file.type, url };
}
