<script setup lang="ts">
	const visible = ref(false);

	function showModal() {
		visible.value = true;
	}

	function closeModal() {
		visible.value = false;
	}
</script>

<template>
	<!-- PC -->
	<Button
		label="Post"
		size="large"
		class="!hidden xl:!flex"
		rounded
		@click="showModal"
	/>
	<!-- TABLET, MOBILE -->
	<Button
		icon="pi pi-plus"
		aria-label="Post"
		class="xl:hidden"
		rounded
		@click="showModal"
	/>
	<Dialog
		v-model:visible="visible"
		header="New post creation"
		class="mx-4 w-full max-w-[586px] !rounded-3xl"
		:dismissable-mask="true"
		:close-on-escape="true"
		:draggable="false"
		:modal="true"
	>
		<div class="flex gap-x-2">
			<NewPostForm @on-success="closeModal" />
		</div>
	</Dialog>
</template>
