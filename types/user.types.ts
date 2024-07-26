import type { Profile, User } from '@prisma/client';

export type PrismaUser = User & { profile: Profile };
