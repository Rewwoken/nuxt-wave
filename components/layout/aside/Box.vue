<script setup lang="ts">
	defineProps<{
		title: string;
		footerLink: string;
	}>();
</script>

<template>
	<article
		class="px-4 py-3 border rounded-2xl border-gray-500/20"
	>
		<h2 class="mb-4 text-xl font-bold">
			{{ title }}
		</h2>
		<slot />
		<NuxtLink
			:to="footerLink"
			class="inline-block w-full mt-4 text-sm font-semibold text-primary-500 hover:underline"
		>
			Show more
		</NuxtLink>
	</article>
</template>
