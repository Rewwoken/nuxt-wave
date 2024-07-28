<script setup lang="ts">
  import { registerSchema } from '~/schemas/register';

  const emit = defineEmits(['closeModal']);

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      registerSchema.pick({ email: true }),
    ),
  });
  const [email] = defineField('email');
  const hasErrors = computed(() => Object.keys(errors.value).length);

  const serverError = ref<string | null>(null);

  const toast = useToast();
  const onSubmit = handleSubmit(async (values) => {
    serverError.value = null;
    const { error } = await useFetch('/api/send/recovery', {
      method: 'POST',
      body: { email: values.email },
    });

    if (error.value) {
      if (error.value.data.message === 'error/not-expired') {
        serverError.value = 'Previous code has not expired!';
      }
      else {
        serverError.value = 'Error sending email!';
      }

      return null;
    }

    toast.add({
      severity: 'info',
      summary: 'A password recovery email has been sent to your email.',
      detail: 'If the user is registered, you will receive an email.',
    });

    emit('closeModal');
  });
</script>

<template>
  <form
    autocomplete="off"
    novalidate
    class="flex flex-col gap-y-2"
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
    <Message v-if="serverError" severity="error" closable>
      {{ serverError }}
    </Message>
    <Button
      label="Send"
      icon="pi pi-send"
      pt:root:class="!mt-4 !text-white"
      :loading="isSubmitting"
      :disabled="hasErrors"
      type="submit"
      fluid
      rounded
    />
  </form>
</template>
