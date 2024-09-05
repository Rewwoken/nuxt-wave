<script setup lang="ts">
	defineProps<{
		role?: 'root' | 'parent' | 'reply';
		imageUrl: string | null;
	}>();
</script>

<template>
	<UserImage
		v-if="!role"
		class="min-w-[40px]"
		:src="imageUrl"
		:px="40"
	/>
	<div
		v-else-if="role === 'root'"
		class="flex min-w-[40px] flex-col items-center gap-x-2 pt-3"
	>
		<UserImage
			:src="imageUrl"
			:px="40"
		/>
		<div class="h-full w-px border border-surface" />
	</div>
	<div
		v-else-if="role === 'parent'"
		class="flex min-w-[40px] flex-col items-center gap-x-2"
	>
		<div class="h-6 w-px border border-surface" />
		<UserImage
			:src="imageUrl"
			:px="40"
		/>
		<div class="h-full w-px border border-surface" />
	</div>
	<div
		v-else-if="role === 'reply'"
		class="flex min-w-[40px] flex-col items-center gap-x-2"
	>
		<div class="h-3 w-px border border-surface" />
		<UserImage
			:src="imageUrl"
			:px="40"
		/>
	</div>
</template>
