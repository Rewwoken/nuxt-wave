<!-- * Consider reading https://vee-validate.logaretm.com/v4/guide/composition-api/custom-inputs#handling-events to better understand the code -->
<script setup lang="ts">
	const { value, handleChange, handleBlur, errorMessage } = useField<string>('text', undefined, {
		validateOnValueUpdate: false, // ! Disable default validate on update
	});

	const validationListeners = {
		input: (event: Event) => handleChange(event, !!errorMessage.value),
		blur: (event: Event) => handleBlur(event, true),
		change: handleChange,
	};
</script>

<template>
	<Textarea
		id="new-post-text"
		name="postText"
		placeholder="What is happening?!"
		pt:root:class="resize-none border-none !bg-transparent text-xl"
		:value="value"
		:auto-resize="true"
		v-on="validationListeners"
	/>
</template>
