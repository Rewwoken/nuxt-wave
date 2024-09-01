import { tabNames } from '~/components/profile/tabs/tabs.data';

export function useProfileTabs(username: string) {
	const router = useRouter();

	const initialTab = computed(() => {
		const path = router.currentRoute.value.path;
		const pathWithoutUsername = path.split(`/${username}/`)[1];

		return tabNames.find(tab => tab === pathWithoutUsername) || tabNames[0];
	});

	const tab = ref(initialTab.value);

	watch(tab, async (newTab) => {
		const path = newTab ? `/${username}/${newTab}` : `/${username}`;
		await router.push(path);
	});

	return { tab, tabNames };
}
