<script setup lang="ts">
	defineProps<{
		isParent: boolean;
		imageUrl: string | null;
	}>();
</script>

<template>
	<CommonUserImage
		v-if="!isParent"
		:src="imageUrl"
		:px="40"
	/>
	<div
		v-else
		class="flex min-w-[40px] flex-col items-center"
	>
		<CommonUserImage
			:src="imageUrl"
			:px="40"
		/>
		<div class="h-full w-px border border-surface" />
	</div>
</template>
