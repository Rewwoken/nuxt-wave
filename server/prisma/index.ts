import { PrismaClient } from '@prisma/client';
import { postModelCreateExtension } from '~/server/prisma/extensions/model/post/create';
import { postModelDeleteExtension } from '~/server/prisma/extensions/model/post/delete';
import { postQueryCreateExtension } from '~/server/prisma/extensions/query/post/create';
import { postQueryDeleteExtension } from '~/server/prisma/extensions/query/post/delete';

// ! Query extensions should be added before model extensions.
// ! Because model extensions depend on query extensions.

export const prisma = new PrismaClient()
	// Query extensions
	.$extends(postQueryCreateExtension)
	.$extends(postQueryDeleteExtension)
	// Model extensions
	.$extends(postModelCreateExtension)
	.$extends(postModelDeleteExtension);
