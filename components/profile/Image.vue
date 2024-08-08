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
	<div class="absolute flex justify-center select-none">
		<UserImage
			:src="source"
			:px="140"
			class="cursor-pointer border-bg-color border-[3px] bg-color"
			@click="showModal"
		/>
	</div>
	<Dialog
		v-model:visible="visible"
		pt:root:class="!bg-transparent !border-none !shadow-none !static"
		:dismissable-mask="true"
		:close-on-escape="true"
		:show-header="false"
		:draggable="false"
		:modal="true"
	>
		<UserImage
			:src="source"
			:px="384"
		/>
	</Dialog>
</template>
