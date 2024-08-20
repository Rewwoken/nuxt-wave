<script setup lang="ts">
	defineProps<{
		value: string | null;
	}>();
</script>

<template>
	<Message
		v-if="value"
		severity="error"
		closable
	>
		{{ value }}
	</Message>
</template>
