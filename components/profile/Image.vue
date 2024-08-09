<script setup lang="ts">
	defineProps<{
		source: string | null;
	}>();

	const visible = ref(false);

	function showModal() {
		visible.value = true;
	}
</script>

<template>
	<CommonUserImage
		class="absolute cursor-pointer border-[3px] border-bg-color bg-color"
		:src="source"
		:px="140"
		@click="showModal"
	/>
	<Dialog
		v-model:visible="visible"
		pt:root:class="!static !border-none !bg-transparent !shadow-none"
		:dismissable-mask="true"
		:close-on-escape="true"
		:show-header="false"
		:draggable="false"
		:modal="true"
	>
		<CommonUserImage
			:src="source"
			:px="384"
		/>
	</Dialog>
</template>
