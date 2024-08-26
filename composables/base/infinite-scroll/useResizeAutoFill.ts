/**
 * A composable function that handles auto-filling content based on resize events.
 * It ensures that the content fills a minimum height by loading more items when necessary.
 *
 * @param target - A reactive reference or getter function that returns the target HTML element to observe for resizing.
 * @param loadMore - A function that loads more content when called. It should return a Promise.
 * @param canLoadMore - A reactive reference or getter function that indicates whether more content can be loaded.
 * @param distance - The minimum distance (in pixels) to maintain between the bottom of the content and the viewport.
 * @returns An object containing a `safeLoadMore` function that MUST be used to manually trigger loading more content.
 */
export function useResizeAutoFill(
	target: MaybeRefOrGetter<HTMLElement | null>,
	loadMore: () => Promise<void>,
	canLoadMore: MaybeRefOrGetter<boolean>,
	distance: number,
) {
	// Initialize a counter to keep track of the number of times content has been loaded
	const { count, inc } = useCounter(1);

	// Function to safely load more content and increment the counter
	async function safeLoadMore() {
		await loadMore();
		inc();
	}

	// Compute the minimum height based on the count and distance
	const minHeight = computed(() => {
		return count.value * distance;
	});

	// Observe resize events on the target element
	useResizeObserver(target, async (entries) => {
		const entry = entries[0];
		const contentHeight = entry.contentRect.height;

		// Resolve reactive values
		const resolveCanLoadMore = resolveUnref(canLoadMore);
		const resolveMinHeight = resolveUnref(minHeight);

		// Check if more content is needed and can be loaded
		const needsMoreContent = contentHeight < resolveMinHeight;
		const shouldLoadMore = resolveCanLoadMore && needsMoreContent;

		// Load more content if conditions are met
		if (shouldLoadMore) {
			await safeLoadMore();
		}
	});

	// Return the safeLoadMore function for external use
	return { safeLoadMore };
}
