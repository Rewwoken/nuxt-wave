<script setup lang="ts">
	const items = reactive([
		{
			title: 'SpaceX',
			count: '18.8k',
		},
		{
			title: '#CodingIsFun',
			count: '9.2k',
		},
		{
			title: '#artforall',
			count: '2.3k',
		},
	]);
</script>

<template>
	<section class="border rounded-2xl">
		<h2 class="px-3 py-2 text-xl font-bold border-b">
			What's happening
		</h2>
		<ul>
			<li v-for="item in items" :key="item.title" class="p-2 border-b">
				<span class="font-bold">{{ item.title }}</span>
				<p class="text-sm text-neutral-400">
					{{ item.count }} Tweets
				</p>
			</li>
		</ul>
		<button class="w-full p-3 text-sm text-left text-sky-600 hover:underline">
			Show more
		</button>
	</section>
</template>
