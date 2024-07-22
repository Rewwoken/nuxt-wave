import type { findUserById } from '~/server/database/user';
import type { ProfileSchema } from '~/schemas/profile';

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

  async function updateProfile(values: ProfileSchema) {
    Object.assign(currentUser.value.profile, values);
  }

  return {
    currentUser: currentUser.value,
    fetchCurrentUser,
    updateProfile,
  };
};
