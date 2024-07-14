<script setup lang="ts">
	const { params } = useRoute();
</script>

<template>
	<span>
		{{ params.username }}
	</span>
</template>
