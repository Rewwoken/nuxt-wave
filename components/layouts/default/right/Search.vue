<script setup lang="ts">
	const term = ref('');
</script>

<template>
	<IconField>
		<InputIcon class="pi pi-search" />
		<InputText
			v-model="term"
			name="Search"
			placeholder="Search"
			pt:root:class="!rounded-full !bg-neutral-400/20 !border-none dark:!text-white"
			fluid
			rounded
			filled
		/>
	</IconField>
</template>
