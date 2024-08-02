<!-- TODO: robots.txt -->
<script setup lang="ts">
	const { theme } = useTheme();

	const config = useRuntimeConfig();
	useHead({
		htmlAttrs: {
			lang: 'en',
		},
		bodyAttrs: {
			class: theme,
		},
		link: [
			{
				rel: 'canonical',
				href: `${config.public.baseUrl}/home`,
			},
		],
	});

	useSeoMeta({
		titleTemplate: (titleChunk) => {
			return titleChunk ? `${titleChunk} / Wave` : 'Wave';
		},
		// TODO: add ogImage
		ogTitle: 'Wave - Dive into the Next Generation of Social Media',
		description: 'A social media app that connects people worldwide, providing new opportunities for communication and information sharing.',
		ogDescription: 'Wave is a revolutionary social media app offering innovative features and an enhanced user experience.',
	});
</script>

<template>
	<div
		class="bg-white min-h-dvh dark:bg-dim dark:text-white w-full"
		:style="{ 'font-family': 'Inter' }"
	>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
	<Toast />
</template>
