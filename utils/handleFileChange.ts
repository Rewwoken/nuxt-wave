type FileChangeCallback = (file: File, url: string) => void;

export function handleFileChange(event: Event, cb: FileChangeCallback) {
	const target = event.target as HTMLInputElement;
	const file = target.files![0];

	const fileReader = new FileReader();

	fileReader.onload = (event) => {
		const url = event.target?.result as string;

		cb(file, url);
	};

	fileReader.readAsDataURL(file);
}
