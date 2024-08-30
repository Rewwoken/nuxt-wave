interface InfiniteWindowScrollOptions {
	/** The direction of scrolling to trigger loading: 'top' or 'bottom'. */
	direction: 'top' | 'bottom';
	/** The distance in pixels from the edge of the viewport to trigger loading. */
	distance: number;
}

/**
 * Composable for implementing infinite scrolling behavior on a window.
 *
 * Note: This composable is specifically for window scroll observing. For element-specific
 * infinite scrolling, consider using the `useInfiniteScroll` composable from VueUse,
 * which does not support window scroll observing.
 *
 * @param list - The HTML element containing the list of items.
 * @param canLoadMore - A reactive boolean indicating if more items can be loaded.
 * @param loadMore - A function to load more items.
 * @param options - Configuration options for the infinite scroll behavior.
 * @returns A cleanup function to stop the infinite scroll watchers.
 */
export function useInfiniteWindowScroll(
	list: MaybeRefOrGetter<HTMLElement | null>,
	canLoadMore: MaybeRefOrGetter<boolean>,
	loadMore: () => Promise<void>,
	options: InfiniteWindowScrollOptions,
) {
	// Create an effect scope to manage reactive effects
	const scope = effectScope();

	scope.run(() => {
		// Use the resize auto-fill composable to safely handle initial loading and resizing
		const { safeLoadMore } = useResizeAutoFill(list, loadMore, canLoadMore, options.distance);

		// Get the current scroll position
		const { y } = useWindowScroll();

		// Compute the distance to the bottom of the page
		const distanceToBottom = computed(() => {
			if (!window || !document) {
				return Infinity;
			}

			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			return documentHeight - (y.value + windowHeight);
		});

		// Determine if more content should be loaded based on scroll position
		const shouldLoadMore = computed(() => {
			return distanceToBottom.value < options.distance;
		});

		// Load more content when the computed value becomes true
		whenever(shouldLoadMore, async () => {
			await safeLoadMore();
		});
	});

	// Compute whether loading should stop based on the canLoadMore prop
	const shouldStopLoading = computed(() => {
		const resolveCanLoadMore = resolveUnref(canLoadMore);
		return !resolveCanLoadMore;
	});

	/** Stops the effect scope, cleaning up all reactive effects. */
	function cleanup() {
		scope.stop();
	}

	// Stop loading when shouldStopLoading becomes true
	whenever(shouldStopLoading, cleanup);

	// Return the cleanup function for external use
	return cleanup;
}
