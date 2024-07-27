import type { Profile, User } from '@prisma/client';

export type PrismaUser = Pick<User, 'id' | 'username' | 'createdAt'> & {
  profile: Pick<Profile, 'name' | 'bio' | 'location' | 'website' | 'imageUrl' | 'bannerUrl'>;
};
