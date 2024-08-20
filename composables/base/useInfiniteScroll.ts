/**
 * Creates and manages an IntersectionObserver to lazily load data when the sentinel element intersects with the viewport.
 *
 * @param sentinel - The element used as the observer target. When this element intersects with the viewport(respecting the distance parameter), the loadMore function is triggered.
 * @param distance - The distance in pixels from the bottom of the viewport at which the observer should be triggered.
 * @param loadMore - An asynchronous function that will be called to load additional data.
 * @param canLoadMore - A ref that holds a boolean indicating whether more data can be loaded. If `false`, the observer is disconnected.
 */
export function useInfiniteScroll(
	sentinel: Ref<HTMLElement | null>,
	distance: number,
	loadMore: () => Promise<void>,
	canLoadMore: Ref<boolean>,
): void {
	let observer: IntersectionObserver | null = null;

	// Connect the `IntersectionObserver` when the component is mounted.
	onMounted(() => {
		if (!sentinel.value) {
			throw new Error('Sentinel element is not defined');
		}

		observer = new IntersectionObserver(onIntersection, {
			rootMargin: `0px 0px ${distance}px 0px`,
		});

		observer.observe(sentinel.value);
	});

	// Disconnect the `IntersectionObserver` before the component is unmounted.
	onBeforeUnmount(() => {
		observer?.disconnect();
	});

	// Disconnect the `IntersectionObserver` when the `canLoadMore` ref is false.
	watch(canLoadMore, (value) => {
		if (value === false) {
			observer?.disconnect();
		}
	});

	/**
	 * Handles the intersection event for the sentinel element.
	 *
	 * @param entries - A list of intersection entries containing the sentinel element as the first one.
	 */
	async function onIntersection(entries: IntersectionObserverEntry[]) {
		const sentinelEntry = entries[0];

		if (sentinelEntry.isIntersecting && canLoadMore.value) {
			await loadMore();
		}
	}
};
