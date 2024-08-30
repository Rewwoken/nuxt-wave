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
		pt:root:class="!hidden xl:!flex"
		rounded
		@click="showModal"
	/>
	<!-- TABLET, MOBILE -->
	<Button
		icon="pi pi-plus"
		aria-label="Post"
		pt:root:class="xl:hidden"
		rounded
		@click="showModal"
	/>
	<Dialog
		v-model:visible="visible"
		header="New post creation"
		pt:root:class="mx-4 w-full max-w-[586px] !rounded-3xl"
		:dismissable-mask="true"
		:close-on-escape="true"
		:draggable="false"
		:modal="true"
	>
		<template #container="{ closeCallback }">
			<div class="flex gap-x-2 p-6">
				<NewPostForm @on-success="closeCallback" />
			</div>
		</template>
	</Dialog>
</template>
