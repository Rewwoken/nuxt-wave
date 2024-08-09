<script setup lang="ts">
	defineEmits<{
		(e: 'onClick'): void;
	}>();
</script>

<template>
	<Button
		icon="pi pi-file-plus"
		severity="contrast"
		pt:root:class="!absolute"
		pt:icon:class="!text-2xl"
		rounded
		@click="$emit('onClick')"
	/>
</template>
