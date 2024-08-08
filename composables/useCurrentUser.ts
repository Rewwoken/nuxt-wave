import type { User } from '~/types/api.types';

// Current user data is fetched in ~/layouts/default.vue
export default () => useState<User>('current-user');
