import type {
	Profile as PrismaProfile,
	User as PrismaUser,
} from '@prisma/client';

export type User = Pick<PrismaUser, 'id' | 'username' | 'createdAt'> & {
	profile: Pick<PrismaProfile, 'name' | 'bio' | 'location' | 'website' | 'imageUrl' | 'bannerUrl'>;
};
