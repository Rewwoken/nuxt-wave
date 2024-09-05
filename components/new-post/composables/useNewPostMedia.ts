interface MediaItem {
	file: File;
	mimetype: string;
}

export function useNewPostMedia() {
	const items = reactive<MediaItem[]>([]);

	const handleMediaAdd = (file: File, mimetype: string) => {
		items.push({ file, mimetype });
	};

	const handleMediaDelete = (index: number) => {
		items.splice(index, 1);
	};

	function clear() {
		items.splice(0, items.length);
	}

	return { items, handleMediaAdd, handleMediaDelete, clear };
}
