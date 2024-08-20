<!-- * Consider reading https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs#handling-events to better understand the code -->
<script setup lang="ts">
	const props = defineProps<{
		icon: string;
		name: string;
		type: string;
		placeholder: string;
	}>();

	const { value, handleChange, handleBlur, errorMessage } = useField(() => props.name, undefined, {
		validateOnValueUpdate: false, // ! Disable default validate on update
	});

	const validationListeners = {
		input: (event: Event) => handleChange(event, !!errorMessage.value),
		blur: (event: Event) => handleBlur(event, true),
		change: handleChange,
	};

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
			v-on="validationListeners"
		/>
	</IconField>
	<VeeErrorMessage
		:id="`${name}-help`"
		class="ml-2 text-xs text-red-500"
		:name="name"
	/>
</template>
