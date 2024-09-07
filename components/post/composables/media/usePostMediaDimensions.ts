export function usePostMediaDimensions(quantity: number) {
	const isMobile = toValue(useMediaQuery('(max-width: 767px)'));

	const BASE_WIDTH = 500;
	const BASE_HEIGHT = 600;

	const width = computed(() => isMobile ? BASE_WIDTH * 0.7 : BASE_WIDTH);
	const height = computed(() => isMobile ? BASE_HEIGHT * 0.7 : BASE_HEIGHT);

	const dimensions = computed(() => {
		const scale = quantity === 1 || (isMobile && quantity > 2) ? 1 : 0.5;
		return {
			width: width.value * scale,
			height: height.value * scale,
		};
	});

	return { dimensions };
}
