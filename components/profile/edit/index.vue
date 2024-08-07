<script setup lang="ts">
	const visible = ref(false);
</script>

<template>
	<Button
		label="Edit profile"
		severity="contrast"
		size="small"
		pt:root:class="px-6 ml-auto"
		pt:label:class="!font-bold"
		rounded
		outlined
		@click="visible = true"
	/>
	<Dialog
		v-model:visible="visible"
		pt:root:class="w-[35rem] mx-2"
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
