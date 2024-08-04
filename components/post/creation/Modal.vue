<script setup lang="ts">
	const visible = ref(false);

	function showModal() {
		visible.value = true;
	}
</script>

<template>
	<!-- PC -->
	<Button
		label="Post"
		size="large"
		pt:root:class="!hidden xl:!block"
		pt:label:class="!text-xl !font-bold !text-white"
		rounded
		@click="showModal"
	/>
	<!-- TABLET, MOBILE -->
	<Button
		icon="pi pi-plus"
		aria-label="Post"
		pt:root:class="xl:!hidden !size-12"
		pt:icon:class="!text-white"
		rounded
		@click="showModal"
	/>
	<Dialog
		v-model:visible="visible"
		header="New post creation"
		pt:root:class="w-full max-w-[586px] mx-4 dark:!bg-dim !border-gray-500/20"
		pt:header:class="dark:!text-white !pt-4"
		:dismissable-mask="true"
		:close-on-escape="true"
		:draggable="false"
		:modal="true"
	>
		<div class="flex gap-x-1 modal">
			<PostCreation />
		</div>
	</Dialog>
</template>
