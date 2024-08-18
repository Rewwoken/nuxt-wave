<script setup lang="ts">
	defineProps<{
		title: string;
		footerLink: string;
	}>();
</script>

<template>
	<article
		class="rounded-2xl border px-4 py-3 border-surface"
	>
		<h2 class="mb-4 text-xl font-bold">
			{{ title }}
		</h2>
		<slot />
		<NuxtLink
			class="mt-4 inline-block w-full text-sm font-semibold text-primary-500 hover:text-primary-emphasis"
			:to="footerLink"
		>
			Show more
		</NuxtLink>
	</article>
</template>
