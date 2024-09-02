import { PrismaClient } from '@prisma/client';
import { postModelCreateExtension } from '~/server/prisma/extensions/model/post/create';
import { postModelDeleteExtension } from '~/server/prisma/extensions/model/post/delete';
import { postQueryCreateExtension } from '~/server/prisma/extensions/query/post/create';
import { postQueryDeleteExtension } from '~/server/prisma/extensions/query/post/delete';

// ! Query extensions should be added before model extensions.
// ! Because model extensions depend on query extensions.

/**
 * Prisma singleton instance, MUST be used for all database operations.
 * This ensures that all extensions and configurations are applied consistently.
 */
export const prisma = new PrismaClient()
	// Query extensions
	.$extends(postQueryCreateExtension)
	.$extends(postQueryDeleteExtension)
	// Model extensions
	.$extends(postModelCreateExtension)
	.$extends(postModelDeleteExtension);
