import type { Post } from '~/types/api.types';

export async function useProfilePosts(userId: string) {
  const posts = ref<Post[]>([]);

  const { $api } = useNuxtApp();
  async function loadMore() {
    const moreData = await $api(`/api/user/${userId}/posts`, {
      method: 'GET',
      params: { skip: posts.value.length, take: 3 },
    });

    posts.value.push(...moreData);
  }

  return {
    posts,
    loadMore,
  };
}
