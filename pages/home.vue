<script setup lang="ts">
	useSeoMeta({
		title: 'Home',
	});
</script>

<template>
	<div class="fixed bottom-20 md:hidden max-w-[586px] flex justify-end w-full px-4">
		<PostCreationModal />
	</div>
	<section class="hidden w-full p-3 gap-x-4 md:flex">
		<PostCreation />
	</section>
</template>
