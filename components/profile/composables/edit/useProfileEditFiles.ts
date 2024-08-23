export function useProfileEditFiles() {
	const image = ref<File>();
	const banner = ref<File>();

	function updateImage(file: File) {
		image.value = file;
	}

	function updateBanner(file: File) {
		banner.value = file;
	}

	return { image, banner, updateImage, updateBanner };
}
