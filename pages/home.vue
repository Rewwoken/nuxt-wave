<script setup lang="ts">
	useSeoMeta({
		title: 'Home',
	});

	definePageMeta({
		layout: 'home',
	});
</script>

<template>
	<section class="flex w-full gap-x-4 p-3">
		<NewPostForm />
	</section>
</template>
