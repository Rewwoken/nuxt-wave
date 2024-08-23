<script setup lang="ts">
	import InputText from 'primevue/inputtext';
	import Textarea from 'primevue/textarea';

	const props = defineProps<{
		is: 'input' | 'textarea';
		name: string;
		type: string;
		placeholder: string;
		autocomplete: string;
		maxLength: number;
	}>();

	const { value, errorMessage, listeners } = usePassiveField(props.name);
	const variant = computed(() => props.is === 'input' ? InputText : Textarea);
</script>

<template>
	<div class="relative flex flex-col">
		<component
			:is="variant"
			size="large"
			pt:root:class="group py-5"
			:class="{ 'resize-none': is === 'textarea' }"
			:autocomplete="autocomplete"
			:maxlength="maxLength"
			:value="value"
			:name="name"
			:type="type"
			:placeholder="placeholder"
			:invalid="!!errorMessage"
			:aria-describedby="`${name}-help`"
			:auto-resize="is === 'textarea'"
			fluid
			v-on="listeners"
		/>
		<span class="absolute right-4 top-1 z-10 text-sm text-muted-color">
			{{ value?.length || 0 }} / {{ maxLength }}
		</span>
		<VeeErrorMessage
			:id="`${name}-help`"
			class="ml-2 text-xs text-red-500"
			:name="name"
		/>
	</div>
</template>
