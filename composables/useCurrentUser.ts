import type { findUserById } from '~/server/database/user';

type User = NonNullable<Awaited<ReturnType<typeof findUserById>>>;
type UserState = Omit<User, 'password'>;

export default () => {
  const currentUser = useState<UserState>('current-user');

  // Called once in ~/layouts/default.vue
  async function fetchCurrentUser() {
    const { $api } = useNuxtApp();
    const user = await $api('/api/me');

    // @ts-expect-error | TODO: complete typings
    currentUser.value = user;
  }

  return {
    currentUser: currentUser.value,
    fetchCurrentUser,
  };
};
