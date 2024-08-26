<script setup lang="ts">
	const props = defineProps<{
		id: string;
		count: number;
	}>();
	const repliesCount = ref(props.count);

	const label = computed(() => String(repliesCount.value));
	const visible = ref(false);

	function showModal() {
		visible.value = true;
	}
</script>

<template>
	<Button
		title="Reply to post"
		aria-label="Reply to post"
		icon="pi pi-comment"
		severity="secondary"
		size="small"
		:label="label"
		text
		@click="showModal"
	/>
	<Dialog
		v-model:visible="visible"
		header="New post creation"
		pt:root:class="mx-4 w-full max-w-[586px]"
		:dismissable-mask="true"
		:close-on-escape="true"
		:draggable="false"
		:modal="true"
	>
		<div class="flex gap-x-2">
			<NewPostForm :parent-id="id" />
		</div>
	</Dialog>
</template>
