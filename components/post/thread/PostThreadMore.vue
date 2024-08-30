<script setup lang="ts">
	const props = defineProps<{
		rootId: string;
	}>();

	const link = computed(() => `/post/${props.rootId}`);
</script>

<template>
	<div class="flex items-center gap-x-2 py-0.5 text-center hover:bg-emphasis">
		<!-- PostAside width is 40px -->
		<div class="flex w-[40px] items-center justify-center">
			<i class="pi pi-ellipsis-v text-surface-600" />
		</div>
		<NuxtLink
			class="text-primary-500"
			:to="link"
		>
			View more replies
		</NuxtLink>
	</div>
</template>
