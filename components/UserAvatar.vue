<script setup lang="ts">
	defineProps<{
		src: string | null;
	}>();
</script>

<template>
	<NuxtImg
		v-if="src"
		:src="src"
		alt="user image"
		class="rounded-full size-10"
	/>
	<Avatar
		v-else
		icon="pi pi-user"
		size="large"
		shape="circle"
		class="!size-10 dark:bg-dim dark:border !min-h-10 !min-w-10"
	/>
</template>
