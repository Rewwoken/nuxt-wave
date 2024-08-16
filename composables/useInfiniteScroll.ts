/**
 * Creates and manages an IntersectionObserver to lazily load data when the sentinel element intersects with the viewport.
 *
 * @param sentinel - The element used as the observer target. When this element intersects with the viewport(respecting the distance parameter), the loadMore function is triggered.
 * @param distance - The distance in pixels from the bottom of the viewport at which the observer should be triggered.
 * @param loadMore - An asynchronous function that will be called to load additional data.
 * @param canLoadMore - A ref that holds a boolean indicating whether more data can be loaded. If `false`, the observer is disconnected.
 */
export default (sentinel: Ref<HTMLElement | null>, distance: number, loadMore: () => Promise<void>, canLoadMore: Ref<boolean>) => {
	let observer: IntersectionObserver | null = null;

	/**
	 * Handles the intersection event for the sentinel element.
	 *
	 * @param entries - A list of intersection entries containing the sentinel element as the first one.
	 */
	async function onIntersection(entries: IntersectionObserverEntry[]): Promise<void> {
		const sentinelEntry = entries[0];

		if (sentinelEntry.isIntersecting && canLoadMore.value) {
			await loadMore();
		}

		if (!canLoadMore.value && observer && sentinel.value) {
			observer.unobserve(sentinel.value);
		}
	}

	// Creates the `IntersectionObserver` and starts observing the sentinel element when the component is mounted.
	onMounted(() => {
		observer = new IntersectionObserver(onIntersection, {
			rootMargin: `0px 0px ${distance}px 0px`,
		});

		if (sentinel.value) {
			observer.observe(sentinel.value);
		}
	});

	// Stops observing the sentinel element and disconnects the `IntersectionObserver` when the component is unmounted.
	onUnmounted(() => {
		if (observer && sentinel.value) {
			observer.unobserve(sentinel.value);
		}

		observer = null;
	});
};
