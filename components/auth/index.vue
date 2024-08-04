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
	<div class="flex flex-col gap-y-6">
		<AuthLogin />
		<AuthRecoverySendModal />
	</div>
	<Button
		label="Haven't registered yet?"
		size="small"
		pt:root:class="!bg-transparent !p-0 !mt-1"
		pt:label:class="hover:!underline"
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
		<AuthRegister @close-modal="closeModal" />
	</Dialog>
</template>
