import { FetchError } from 'ofetch';
import type { ZodSchema, z } from 'zod';

// eslint-disable-next-line unused-imports/no-unused-vars
export default <T extends ZodSchema>(schema: T) => {
  const serverError = ref<string | null>(null);
  const isPending = ref(false);

  async function handleRequest(method: any, url: string, body: z.infer<T>) {
    serverError.value = null;
    isPending.value = true;

    try {
      await $fetch(url, {
        method,
        body,
      });
    }
    catch (error) {
      if (error instanceof FetchError) {
        const message = error.data.message as string;

        serverError.value = message;
      }
      else {
        serverError.value = 'Unexpected error! Try again later.';
      }
    }
    finally {
      isPending.value = false;
    }
  }

  return { handleRequest, isPending, serverError };
};
