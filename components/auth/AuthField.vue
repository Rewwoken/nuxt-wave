<script setup lang="ts">
	const props = defineProps<{
		icon: string;
		name: string;
		type: string;
		placeholder: string;
	}>();

	const { value, errorMessage, listeners } = usePassiveField(props.name);

	const iconClass = computed(() => {
		if (!props.icon.startsWith('pi-')) {
			throw new Error('Invalid icon provided!');
		}

		return `pi ${props.icon}`;
	});
</script>

<template>
	<IconField>
		<InputIcon :class="iconClass" />
		<InputText
			autocomplete="new-password"
			:value="value"
			:name="name"
			:type="type"
			:placeholder="placeholder"
			:invalid="!!errorMessage"
			:aria-describedby="`${name}-help`"
			fluid
			v-on="listeners"
		/>
	</IconField>
	<VeeErrorMessage
		:id="`${name}-help`"
		class="ml-2 text-xs text-red-500"
		:name="name"
	/>
</template>
