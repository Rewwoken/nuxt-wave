<script setup lang="ts">
	const { data: count } = await useAPI('/api/notifications/count', {
		method: 'GET',
		dedupe: 'defer',
	});

	useSeoMeta({
		titleTemplate: (titleChunk) => {
			const title = count.value ? `(${count.value}) ${titleChunk}` : titleChunk;

			return `${title} / Wave`;
		},
	});
</script>

<template>
	<NuxtLink
		to="/notifications"
		class="flex items-center gap-x-5 rounded-full p-3 hover:bg-emphasis"
		aria-label="Navigate to notifications"
		active-class="font-bold"
	>
		<i class="pi pi-bell relative !text-3xl">
			<Badge
				v-if="count"
				class="absolute -right-2 -top-2 font-sans"
				size="small"
				:value="count"
			/>
		</i>
		<span class="hidden text-xl xl:inline">Notifications</span>
	</NuxtLink>
</template>
