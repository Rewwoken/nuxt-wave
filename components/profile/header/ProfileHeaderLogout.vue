<script setup lang="ts">
	async function onLogout() {
		await logout();
	}
</script>

<template>
	<Button
		icon="pi pi-sign-out"
		aria-label="Back"
		severity="contrast"
		pt:root:class="ml-auto border-none md:hidden"
		pt:icon:class="text-xl"
		outlined
		rounded
		@click="onLogout"
	/>
</template>
