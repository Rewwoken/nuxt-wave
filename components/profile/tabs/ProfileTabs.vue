<script setup lang="ts">
	const props = defineProps<{
		userId: string;
		username: string;
		selected: string | undefined;
	}>();

	const values = ['', 'replies', 'media', 'likes'];
	const initialValue = values.find(v => v === props.selected) || '';

	const selected = ref(initialValue);

	const router = useRouter();
	const route = useRoute();

	watch(selected, (newSelect) => {
		router.push({ query: {
			...route.query,
			select: newSelect || undefined,
		} });
	});
</script>

<template>
	<Tabs v-model:value="selected">
		<TabList>
			<Tab
				v-for="value in values"
				:key="value"
				:value="value"
			>
				<!-- If value is empty string, assume it is 'POSTS' tab -->
				{{ value.toUpperCase() || 'POSTS' }}
			</Tab>
		</TabList>
		<TabPanels>
			<TabPanel value="">
				<ProfilePosts :user-id="userId" />
			</TabPanel>
			<TabPanel value="replies">
				REPLIES
			</TabPanel>
			<TabPanel value="media">
				MEDIA
			</TabPanel>
			<TabPanel value="likes">
				LIKES
			</TabPanel>
		</TabPanels>
	</Tabs>
</template>
