<script setup lang="ts">
	const items = ref([
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
	<ul class="flex flex-col gap-y-6">
		<li
			v-for="item in items"
			:key="item.title"
		>
			<span class="font-bold">{{ item.title }}</span>
			<p class="text-sm text-neutral-500">
				{{ item.count }} Tweets
			</p>
		</li>
	</ul>
</template>
