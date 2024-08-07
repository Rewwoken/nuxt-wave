import type { FetchedUser } from '~/types/api.types';

// Current user data is fetched in ~/layouts/default.vue
export default () => useState<NonNullable<FetchedUser>>('current-user');
