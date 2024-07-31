<script setup lang="ts">
  import { loginSchema } from '~/schemas/login';

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(loginSchema),
  });
  const [username] = defineField('username');
  const [password] = defineField('password');
  const hasErrors = computed(() => Object.keys(errors.value).length);

  const { handleFormRequest, serverError } = useHandleForm();

  const toast = useToast();
  const { $api } = useNuxtApp();

  const onSubmit = handleSubmit(async (values) => {
    await handleFormRequest(
      () => $api('/api/auth/login', {
        method: 'POST',
        body: values,
      }),
      async () => {
        await navigateTo('/home', {
          replace: true,
        });

        toast.add({
          severity: 'info',
          summary: 'Successfully logged in!',
          detail: `You logged in as @${values.username}.`,
          life: 3000,
        });
      },
      {
        'error/credentials': 'Invalid credentials!',
        'error/not-verified': 'Email is not verified!',
        'error/body': 'Invalid data!',
        'error/unknown': 'Unexpected error!',
      },
    );
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
      <InputIcon class="pi pi-at" />
      <InputText
        v-model="username"
        type="text"
        autocomplete="username"
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
        autocomplete="current-password"
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
      pt:root:class="!text-white"
      :loading="isSubmitting"
      :disabled="hasErrors"
      type="submit"
      rounded
    />
  </form>
</template>
