import type { PrismaUser } from '~/types/user.types';

export default () => {
  const currentUser = useState<PrismaUser>('current-user');

  // Called once in ~/layouts/default.vue
  async function fetchCurrentUser() {
    const { $api } = useNuxtApp();
    currentUser.value = await $api<PrismaUser>('/api/me');
  }

  return {
    currentUser: currentUser.value,
    fetchCurrentUser,
  };
};
