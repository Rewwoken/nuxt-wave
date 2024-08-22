import type { z } from 'zod';

// export const createRepostSchema = textPostSchema.extend({
// 	postId: z.string(),
// 	text: textPostSchema,
// });

export type CreateRepostSchema = z.infer<typeof createRepostSchema>;
