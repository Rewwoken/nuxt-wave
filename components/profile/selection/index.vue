<script setup lang="ts">
	const props = defineProps<{
		userId: string;
		initialValue: string;
	}>();

	const selected = ref(props.initialValue);

	const router = useRouter();
	const route = useRoute();

	watch(selected, (value) => {
		router.push({ query: { ...route.query, select: value } });
	});
</script>

<template>
	<Tabs v-model:value="selected">
		<TabList>
			<Tab value="all">
				ALL
			</Tab>
			<Tab value="posts">
				POSTS
			</Tab>
			<Tab value="reposts">
				REPOSTS
			</Tab>
			<Tab value="likes">
				LIKES
			</Tab>
		</TabList>
		<TabPanels>
			<TabPanel value="all">
				ALL
			</TabPanel>
			<TabPanel value="posts">
				<ProfileSelectionPosts :user-id="userId" />
			</TabPanel>
			<TabPanel value="reposts">
				REPOSTS
			</TabPanel>
			<TabPanel value="likes">
				LIKES
			</TabPanel>
		</TabPanels>
	</Tabs>
</template>
