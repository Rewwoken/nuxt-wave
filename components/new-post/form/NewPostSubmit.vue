<script setup lang="ts">
	defineProps<{
		loading: boolean;
		disabled: boolean;
	}>();
</script>

<template>
	<Button
		type="submit"
		label="Create post"
		icon="pi pi-send"
		class="px-8"
		:loading="loading"
		:disabled="disabled"
		rounded
	/>
</template>
