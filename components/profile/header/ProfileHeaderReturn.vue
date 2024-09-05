<script setup lang="ts">
	const router = useRouter();
</script>

<template>
	<Button
		icon="pi pi-arrow-left"
		aria-label="Back"
		severity="contrast"
		class="!border-none"
		outlined
		rounded
		@click="router.back"
	/>
</template>
