<script setup lang="ts">
	defineProps<{
		isSubmitting: boolean;
		hasErrors: boolean;
	}>();

	defineEmits<{
		(e: 'onClose'): void;
		(e: 'onClose'): void;
	}>();
</script>

<template>
	<header class="mb-2 flex items-center px-2 pt-3">
		<Button
			icon="pi pi-times"
			severity="contrast"
			pt:root:class="!border-none"
			outlined
			rounded
			@click="$emit('onClose')"
		/>
		<h2 class="ml-2 text-xl font-semibold text-surface-950 dark:text-surface-0">
			Edit profile
		</h2>
		<Button
			label="Save"
			severity="contrast"
			pt:root:class="ml-auto px-8"
			:loading="isSubmitting"
			:disabled="hasErrors"
			rounded
			@click="$emit('onClose')"
		/>
	</header>
</template>
