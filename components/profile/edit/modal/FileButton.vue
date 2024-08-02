<script setup lang="ts">
	defineEmits<{
		(e: 'onClick'): void;
	}>();
</script>

<template>
	<Button
		icon="pi pi-file-plus"
		severity="contrast"
		pt:root:class="!absolute !border-0 !overflow-visible !size-10 !bg-white/40 dark:!bg-black/40"
		pt:icon:class="!text-black dark:!text-white"
		pt:icon:style="font-size: 1.4rem"
		outlined
		rounded
		@click="$emit('onClick')"
	/>
</template>
