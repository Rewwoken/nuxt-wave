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
		class="flex items-center p-3 rounded-full gap-x-5 hover:bg-gray-500/10"
		aria-label="Navigate to notifications"
		active-class="font-bold"
	>
		<i class="pi pi-bell !relative !text-3xl">
			<Badge
				v-if="count"
				:value="count"
				pt:root:class="!absolute !-top-1 !-right-2 !text-white !font-sans"
				size="small"
			/>
		</i>
		<span class="hidden text-xl xl:inline">Notifications</span>
	</NuxtLink>
</template>
