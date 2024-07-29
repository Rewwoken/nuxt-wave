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
  const hasErrors = computed(() => Object.keys(errors.value).length);

  const serverError = ref<string | null>(null);

  const toast = useToast();
  const onSubmit = handleSubmit(async (values) => {
    serverError.value = null;
    const { error } = await useFetch('/api/auth/register', {
      method: 'POST',
      body: values,
    });

    if (error.value) {
      if (error.value.data.message === 'error/user-exists') {
        serverError.value = 'User already exists!';
      }
      else if (error.value.data.message === 'error/not-expired') {
        serverError.value = 'Previous code has not expired!';
      }
      else if (error.value.data.message === 'error/body') {
        serverError.value = 'Invalid data!';
      }
      else {
        serverError.value = 'Unexpected error!';
      }

      return null;
    }

    toast.add({
      severity: 'info',
      summary: 'An email has been sent to verify your email address.',
      detail: 'Please, check your mailbox and follow the link in the message within 15 minutes before it expires.',
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
      <InputIcon class="pi pi-envelope" />
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
      <InputIcon class="pi pi-at" />
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
        :loading="isSubmitting"
        :disabled="hasErrors"
      />
    </div>
  </form>
</template>
