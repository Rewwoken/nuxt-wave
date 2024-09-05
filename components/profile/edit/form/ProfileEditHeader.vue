<script setup lang="ts">
	defineProps<{
		isSubmitting: boolean;
		hasErrors: boolean;
	}>();

	defineEmits<{
		(e: 'onClose'): void;
		(e: 'onSubmit'): void;
	}>();
</script>

<template>
	<header class="flex items-center py-1.5 pl-1 pr-2">
		<Button
			type="button"
			icon="pi pi-times"
			severity="contrast"
			class="!border-none"
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
			size="small"
			class="ml-auto px-8"
			:loading="isSubmitting"
			:disabled="hasErrors"
			rounded
			@click="$emit('onSubmit')"
		/>
	</header>
</template>
