<script setup lang="ts">
	defineProps<{
		data: string;
	}>();

// TODO: highlight tags
</script>

<template>
	<p class="py-px">
		{{ data }}
	</p>
</template>
