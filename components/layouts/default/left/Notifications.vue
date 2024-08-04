<script setup lang="ts">
	const { data: count } = useAPI('/api/notifications/count', {
		method: 'GET',
		dedupe: 'defer',
	});
</script>

<template>
	<NuxtLink
		to="/notifications"
		class="flex items-center p-3 rounded-full gap-x-5 hover:bg-gray-500/10"
		aria-label="Navigate to notifications"
		active-class="font-bold"
	>
		<i class="pi pi-bell !relative" style="font-size: 1.6rem">
			<Badge
				v-if="count"
				:value="count"
				pt:root:class="!absolute !-top-2 !-right-3 !text-white"
				:pt:root:style="{ 'font-family': 'Inter' }"
				size="small"
			/>
		</i>
		<span class="hidden text-xl xl:inline">Notifications</span>
	</NuxtLink>
</template>
