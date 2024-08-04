<script setup lang="ts">
	useSeoMeta({
		title: 'Home',
	});
</script>

<template>
	<!-- TODO: add mobile post creation -->
	<div class="fixed bottom-4 right-4 md:hidden">
		<PostCreationModal />
	</div>
	<section class="hidden w-full p-3 gap-x-4 md:flex">
		<PostCreation />
	</section>
</template>
