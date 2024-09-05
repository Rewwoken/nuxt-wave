<script setup lang="ts">
	defineProps<{
		data: string;
	}>();

// TODO: highlight tags
</script>

<template>
	<p class="whitespace-pre-wrap py-px">
		{{ data }}
	</p>
</template>
