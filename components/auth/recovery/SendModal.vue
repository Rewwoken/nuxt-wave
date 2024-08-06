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
		label="Forgot password?"
		severity="contrast"
		size="small"
		outlined
		rounded
		fluid
		@click="showModal"
	/>
	<Dialog
		v-model:visible="visible"
		header="Send password recovery email"
		pt:header-actions:class="ml-4"
		:dismissable-mask="true"
		:close-on-escape="true"
		:draggable="false"
		:modal="true"
	>
		<AuthRecoverySendForm @on-submit="closeModal" />
	</Dialog>
</template>
