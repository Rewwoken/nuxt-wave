<script setup lang="ts">
	const { data: count } = await useAPI('/api/notifications/count', {
		method: 'GET',
	});
</script>

<template>
	<NuxtLink
		to="/notifications"
		class="flex items-center gap-x-5 rounded-full p-3 hover:bg-gray-500/10"
		aria-label="Navigate to notifications"
		active-class="font-bold"
	>
		<i class="pi pi-bell !relative" style="font-size: 1.6rem">
			<Badge
				v-if="count"
				:value="count"
				pt:root:class="!absolute !-top-2 !-right-3"
				:pt:root:style="{ 'font-family': 'Inter' }"
				size="small"
			/>
		</i>
		<span class="hidden text-xl xl:inline">Notifications</span>
	</NuxtLink>
</template>
