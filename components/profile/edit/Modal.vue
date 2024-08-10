<script setup lang="ts">
	const visible = ref(false);
</script>

<template>
	<Button
		label="Edit profile"
		severity="contrast"
		size="small"
		pt:root:class="ml-auto px-6"
		pt:label:class="!font-bold"
		rounded
		outlined
		@click="visible = true"
	/>
	<Dialog
		v-model:visible="visible"
		pt:root:class="mx-2 w-[35rem]"
		:dismissable-mask="true"
		:close-on-escape="true"
		:draggable="false"
		:modal="true"
	>
		<template #container="{ closeCallback }">
			<ProfileEditForm @on-submit="closeCallback" />
		</template>
	</Dialog>
</template>
