export function revokeObjectURL(url: string | null) {
	if (url !== null) {
		URL.revokeObjectURL(url);
	}
}
