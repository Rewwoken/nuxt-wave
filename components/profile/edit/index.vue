<script setup lang="ts">
	const visible = ref(false);
</script>

<template>
	<Button
		label="Edit profile"
		severity="contrast"
		size="small"
		pt:root:class="!px-5 !ml-auto"
		pt:label:class="!font-bold"
		rounded
		outlined
		@click="visible = true"
	/>
	<Dialog
		v-model:visible="visible"
		pt:root:class="!shadow-md dark:!bg-dim dark:!border-none dark:!text-white !w-[35rem]"
		:dismissable-mask="true"
		:close-on-escape="true"
		:draggable="false"
		:modal="true"
	>
		<template #container="{ closeCallback }">
			<ProfileEditModal @close-modal="closeCallback" />
		</template>
	</Dialog>
</template>
