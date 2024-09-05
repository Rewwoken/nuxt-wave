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
			class="!rounded-full border-none !bg-neutral-400/20"
			fluid
		/>
	</IconField>
</template>
