interface FileState {
	url: Ref<string | null>;
	file: Ref<File | null>;
}

export function useProfileEditFiles() {
	const image = createFileState();
	const banner = createFileState();

	onUnmounted(() => {
		revokeObjectURL(image.url.value);
		revokeObjectURL(banner.url.value);
	});

	return {
		image,
		banner,
		updateImage: (file: File) => updateFile(image, file),
		updateBanner: (file: File) => updateFile(banner, file),
	};
}

function createFileState(): FileState {
	return {
		file: ref<File | null>(null),
		url: ref<string | null>(null),
	};
}

function updateFile(state: FileState, file: File) {
	revokeObjectURL(state.url.value);

	state.url.value = URL.createObjectURL(file);
	state.file.value = file;
}
