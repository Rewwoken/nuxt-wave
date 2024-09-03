import type { FetchedUser } from '~/types/api.types';

export function useAuth() {
	// User should be fetched in ~/layouts/**
	const authUser = useState<FetchedUser>('authenticated-user');
	if (!authUser) {
		throw new Error('User is not authenticated');
	}

	return { authUser };
}
