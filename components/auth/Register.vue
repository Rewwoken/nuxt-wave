<script setup lang="ts">
  import { registerSchema } from '~/schemas/register';

  const emit = defineEmits(['closeModal']);

  const { handleSubmit, errors, defineField } = useForm({
    validationSchema: toTypedSchema(registerSchema),
  });
  const [email] = defineField('email');
  const [username] = defineField('username');
  const [password] = defineField('password');
  const hasErrors = computed(() => Object.keys(errors.value).length);

  const { handleRequest, isPending, serverError } = useHandleForm(registerSchema);

  const toast = useToast();
  const onSubmit = handleSubmit(async (values) => {
    await handleRequest('POST', '/api/auth/register', values);

    if (serverError.value) {
      if (serverError.value === 'error/exist') {
        serverError.value = 'User already exists!';
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
      severity: 'success',
      summary: 'Registration successful!',
      detail: 'Now you can log in to a new account.',
      life: 3000,
    });

    emit('closeModal');
  });
</script>

<template>
  <form
    autocomplete="off"
    class="flex w-80 flex-col gap-y-2"
    novalidate
    @submit="onSubmit"
  >
    <IconField class="w-full">
      <InputIcon class="pi pi-users" />
      <InputText
        v-model="email"
        type="text"
        autocomplete="new-password"
        placeholder="Email"
        aria-describedby="email-help"
        :invalid="errors.email"
        autofocus
        fluid
      />
    </IconField>
    <small v-if="errors.email" id="email-help" class="ml-2 text-xs text-red-500">
      {{ errors.email }}
    </small>
    <IconField class="w-full">
      <InputIcon class="pi pi-user" />
      <InputText
        v-model="username"
        type="text"
        autocomplete="new-password"
        placeholder="Username"
        aria-describedby="username-help"
        :invalid="errors.username"
        fluid
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
        fluid
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
    <div class="flex items-end justify-between">
      <IconNuxt class="size-10 !fill-dim" />
      <Button
        type="submit"
        label="Submit"
        size="small"
        pt:root:class="!text-white !mt-1 !self-end !px-6"
        :loading="isPending"
        :disabled="hasErrors"
      />
    </div>
  </form>
</template>
