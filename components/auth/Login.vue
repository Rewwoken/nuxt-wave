<script setup lang="ts">
  import { loginSchema } from '~/schemas/login';

  const { handleSubmit, errors, defineField } = useForm({
    validationSchema: toTypedSchema(loginSchema),
  });
  const [username] = defineField('username');
  const [password] = defineField('password');
  const hasErrors = computed(() => Object.keys(errors.value).length);

  const { handleRequest, isPending, serverError } = useHandleForm(loginSchema);

  const toast = useToast();
  const onSubmit = handleSubmit(async (values) => {
    await handleRequest('POST', '/api/auth/login', values);

    if (serverError.value) {
      if (serverError.value === 'error/credentials') {
        serverError.value = 'Invalid credentials!';
      }
      else if (serverError.value === 'error/body') {
        serverError.value = 'Invalid data!';
      }
      else {
        serverError.value = 'Unexpected error!';
      }

      return null;
    }

    toast.add({
      severity: 'info',
      summary: 'Successfully logged in!',
      detail: `You logged in as @${values.username}.`,
      life: 3000,
    });

    navigateTo('/home');
  });
</script>

<template>
  <form
    autocomplete="off"
    class="flex flex-col gap-y-2"
    novalidate
    @submit="onSubmit"
  >
    <IconField class="w-full">
      <InputIcon class="pi pi-user" />
      <InputText
        v-model="username"
        type="text"
        autocomplete="new-password"
        placeholder="Username"
        aria-describedby="username-help"
        :invalid="errors.username"
        autofocus
      />
    </IconField>
    <small
      v-if="errors.username"
      id="username-help"
      class="ml-2 text-xs text-red-500"
    >
      {{ errors.username }}
    </small>
    <IconField class="w-full">
      <InputIcon class="pi pi-lock" />
      <InputText
        v-model="password"
        type="password"
        autocomplete="new-password"
        placeholder="Password"
        aria-describedby="password-help"
        :invalid="errors.password"
      />
    </IconField>
    <small
      v-if="errors.password"
      id="password-help"
      class="ml-2 text-xs text-red-500"
    >
      {{ errors.password }}
    </small>
    <Message v-if="serverError" severity="error" closable>
      {{ serverError }}
    </Message>
    <Button
      label="Submit"
      icon="pi pi-user"
      pt:root:class="!mt-1 !text-white"
      :loading="isPending"
      :disabled="hasErrors"
      type="submit"
      rounded
    />
  </form>
</template>
