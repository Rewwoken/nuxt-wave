<script setup lang="ts">
	const items = reactive([
		{
			name: 'tokito',
			handle: '@to.toki',
			image: 'https://picsum.photos/200/200',
		},
		{
			name: 'kaleb',
			handle: '@ezkaleb',
			image: 'https://picsum.photos/200/200',
		},
		{
			name: 'teanna',
			handle: '@tenn',
			image: 'https://picsum.photos/200/200',
		},
	]);
</script>

<template>
	<section class="border rounded-2xl">
		<h2 class="px-3 py-2 text-xl font-bold border-b">
			Who to follow
		</h2>
		<li v-for="item in items" :key="item.handle" class="flex items-center p-2 py-3 border-b gap-x-2">
			<UserAvatar :src="item.image" />
			<div class="flex flex-col gap-y-0.5">
				<span class="font-bold leading-4">{{ item.name }}</span>
				<span class="text-sm leading-4 text-neutral-500">{{ item.handle }}</span>
			</div>
			<button class="px-4 py-1.5 ml-auto font-semibold text-sm text-white rounded-full dark:text-black bg-dim dark:bg-white">
				Follow
			</button>
		</li>
		<button class="w-full p-3 text-sm font-semibold text-left text-sky-400 hover:underline">
			Show more
		</button>
	</section>
</template>
