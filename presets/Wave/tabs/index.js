export default {
	tabs: {
		root: ({ props }) => ({
			class: ['flex flex-col', { '[&>[data-pc-name=tablist]]:overflow-hidden': props.scrollable }],
		}),
	},
	tablist: {
		root: 'relative flex',
		content: 'overflow-x-auto overflow-y-hidden scroll-smooth overscroll-x-contain overscroll-y-auto [&::-webkit-scrollbar]:hidden grow',
		tabList: 'relative flex border-solid border-b border-surface-200 dark:border-surface-700',
		nextButton: '!absolute top-0 right-0 z-20 h-full w-10 flex items-center justify-center text-surface-700 dark:text-surface-0/80 bg-surface-0 dark:bg-surface-900 outline-transparent cursor-pointer shrink-0',
		prevButton: '!absolute top-0 left-0 z-20 h-full w-10 flex items-center justify-center text-surface-700 dark:text-surface-0/80 bg-surface-0 dark:bg-surface-900 outline-transparent cursor-pointer shrink-0',
		activeBar: 'hidden',
		// activeBar: 'z-10 block absolute h-4 bottom-[-1px] bg-primary',
	},
	tabpanels: {
		root: 'text-surface-900 dark:text-surface-0/80 outline-0',
	},
	tabpanel: {
		root: 'focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300',
	},
	tab: {
		root: ({ props, context }) => ({
			class: [
				'relative grow basis-0',

				// Shape
				'border-b',
				'rounded-t-sm',

				// Spacing
				'py-3',
				'-mb-px',

				// Colors and Conditions
				'outline-transparent',
				'hover:bg-emphasis transition-colors duration-100',

				// Dynamic styles
				{
					'font-bold border-primary': context.active,
					'font-normal border-surface': !context.active,
					'opacity-60 cursor-default user-select-none select-none pointer-events-none': props == null ? void 0 : props.disabled,
				},

				// States
				'focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300',

				// Misc
				'cursor-pointer select-none whitespace-nowrap',
				'user-select-none',
			],
		}),
	},
};
