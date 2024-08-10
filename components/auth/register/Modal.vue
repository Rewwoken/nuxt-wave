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
	<Button
		label="Haven't registered yet?"
		size="small"
		pt:root:class="!p-0 !ring-0"
		pt:label:class="hover:text-primary-emphasis"
		text
		@click="showModal"
	/>
	<Dialog
		v-model:visible="visible"
		header="Create an account"
		:dismissable-mask="true"
		:close-on-escape="true"
		:draggable="false"
		:modal="true"
	>
		<AuthRegisterForm @on-submit="closeModal" />
	</Dialog>
</template>
