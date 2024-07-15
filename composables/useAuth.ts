import { FetchError } from 'ofetch';
import type { LoginSchema } from '~/schemas/login';
import type { RegisterSchema } from '~/schemas/register';

export default () => {
  const serverError = ref<string | null>(null);
  const isPending = ref(false);

  async function handleRequest(url: string, body: LoginSchema | RegisterSchema) {
    serverError.value = null;
    isPending.value = true;

    try {
      await $fetch(url, {
        method: 'POST',
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

  async function login(body: LoginSchema) {
    await handleRequest('/api/auth/login', body);
  }

  async function register(body: RegisterSchema) {
    await handleRequest('/api/auth/register', body);
  }

  return { login, register, isPending, serverError };
};
