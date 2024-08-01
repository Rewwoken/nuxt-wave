<script setup lang="ts">
  import { registerSchema } from '~/schemas/register';

  const emit = defineEmits<{
    (e: 'closeModal'): void;
  }>();

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(registerSchema),
  });
  const [email] = defineField('email');
  const [username] = defineField('username');
  const [password] = defineField('password');
  const hasErrors = computed(() => !!Object.keys(errors.value).length);

  const { handleFormRequest, serverError } = useHandleForm();

  const toast = useToast();
  const { $api } = useNuxtApp();

  const onSubmit = handleSubmit(async (values) => {
    await handleFormRequest(
      () => $api('/api/auth/register', {
        method: 'POST',
        body: values,
      }),
      async () => {
        toast.add({
          severity: 'info',
          summary: 'An email has been sent to verify your email address.',
          detail: 'Please, check your mailbox and follow the link in the message within 15 minutes before it expires.',
        });

        emit('closeModal');
      },
      {
        'error/user-exists': 'User already exists!',
        'error/not-expired': 'Previous code has not expired!',
        'error/body': 'Invalid data!',
        'error/unknown': 'Unexpected error!',
      },
    );
  });
</script>

<template>
  <form
    autocomplete="off"
    class="flex flex-col w-80 gap-y-2"
    novalidate
    @submit="onSubmit"
  >
    <IconField class="w-full">
      <InputIcon class="pi pi-envelope" />
      <InputText
        v-model="email"
        type="text"
        autocomplete="email"
        placeholder="Email"
        aria-describedby="email-help"
        :invalid="!!!!errors.email"
        autofocus
        fluid
      />
    </IconField>
    <small v-if="errors.email" id="email-help" class="ml-2 text-xs text-red-500">
      {{ errors.email }}
    </small>
    <IconField class="w-full">
      <InputIcon class="pi pi-at" />
      <InputText
        v-model="username"
        type="text"
        autocomplete="off"
        placeholder="Username"
        aria-describedby="username-help"
        :invalid="!!errors.username"
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
        autocomplete="off"
        placeholder="Password"
        aria-describedby="password-help"
        :invalid="!!errors.password"
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
        :loading="isSubmitting"
        :disabled="hasErrors"
      />
    </div>
  </form>
</template>
