<script setup lang="ts">
  import { profileSchema } from '~/schemas/profile';

  const emit = defineEmits<{
    (e: 'closeModal'): void;
  }>();

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(profileSchema),
  });
  const [name] = defineField('name');
  const [bio] = defineField('bio');
  const [location] = defineField('location');
  const [website] = defineField('website');
  const hasErrors = computed(() => Object.keys(errors.value).length);

  const files = reactive<{
    image?: File;
    banner?: File;
  }>({});

  function onFile(key: 'image' | 'banner', file: File) {
    files[key] = file;
  }

  const { handleFormRequest } = useHandleForm();

  const toast = useToast();
  const { $api } = useNuxtApp();

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();

    const textEntries = Object.entries(values);
    for (const [key, value] of textEntries) {
      formData.append(key, value);
    }
    if (files.image) {
      formData.append('image', files.image);
    }
    if (files.banner) {
      formData.append('banner', files.banner);
    }

    await handleFormRequest(
      () => $api('/api/profile', {
        method: 'PATCH',
        body: formData,
      }),
      () => {
        toast.add({
          severity: 'success',
          summary: 'Profile has been successfully changed!',
          detail: 'This may take some time, please update the page.',
          life: 3000,
        });

        emit('closeModal');
      },
      {
        'error/fields': 'Invalid fields.',
        'error/unknown': 'Unexpected error, please try again later.',
      },
      (message) => {
        toast.add({
          severity: 'error',
          summary: 'An error occurred during profile change!',
          detail: message,
          life: 5000,
        });
      },
    );
  });
</script>

<template>
  <header class="mb-2 flex justify-between px-2 pt-3">
    <Button
      icon="pi pi-times"
      severity="contrast"
      pt:root:class="!border-0"
      outlined
      rounded
      @click="$emit('closeModal')"
    />
    <!-- TODO: implement file deleting -->
    <ProfileEditModalSubmit
      :is-pending="isSubmitting"
      :has-errors="!!hasErrors"
      @on-submit="onSubmit"
    />
    <!-- @delete-banner="deleteBanner" -->
    <!-- @delete-image="deleteImage" -->
  </header>
  <ProfileEditModalBanner @on-file="onFile" />
  <ProfileEditModalImage @on-file="onFile" />
  <!-- TODO: handle empty fields case -->
  <form
    autocomplete="off"
    class="flex flex-col gap-y-8 p-3"
    novalidate
  >
    <div class="relative flex flex-col">
      <InputText
        v-model="name"
        type="text"
        size="large"
        autocomplete="name"
        placeholder="Name"
        aria-describedby="name-help"
        :maxlength="50"
        :invalid="errors.name"
        pt:root:class="dark:!border-gray-700 !py-4 dark:!bg-dim dark:!text-white"
      />
      <span class="absolute top-1 right-4 text-sm text-gray-600">{{ name?.length || 0 }} / 50</span>
      <small
        v-if="errors.name"
        id="name-help"
        class="ml-2 text-xs text-red-500"
      >
        {{ errors.name }}
      </small>
    </div>
    <div class="relative flex flex-col">
      <Textarea
        v-model="bio"
        autocomplete="off"
        placeholder="Bio"
        aria-describedby="bio-help"
        :maxlength="160"
        :invalid="errors.bio"
        :auto-resize="true"
        pt:root:class="dark:!border-gray-700 !py-4 dark:!bg-dim dark:!text-white"
      />
      <span class="absolute top-1 right-4 text-sm text-gray-600">{{ bio?.length || 0 }} / 160</span>
      <small
        v-if="errors.bio"
        id="bio-help"
        class="ml-2 text-xs text-red-500"
      >
        {{ errors.bio }}
      </small>
    </div>
    <div class="relative flex flex-col">
      <InputText
        v-model="location"
        type="text"
        size="large"
        autocomplete="country-name"
        placeholder="Location"
        aria-describedby="location-help"
        :maxlength="30"
        :invalid="errors.location"
        pt:root:class="dark:!border-gray-700 !py-4 dark:!bg-dim dark:!text-white"
      />
      <span class="absolute top-1 right-4 text-sm text-gray-600">{{ location?.length || 0 }} / 30</span>
      <small
        v-if="errors.location"
        id="location-help"
        class="absolute -bottom-5 ml-2 text-xs text-red-500"
      >
        {{ errors.location }}
      </small>
    </div>
    <div class="relative flex flex-col gap-y-1">
      <InputText
        v-model="website"
        type="text"
        size="large"
        autocomplete="url"
        placeholder="Website"
        aria-describedby="website-help"
        :maxlength="50"
        :invalid="errors.website"
        pt:root:class="dark:!border-gray-700 !py-4 dark:!bg-dim dark:!text-white"
      />
      <span class="absolute top-1 right-4 text-sm text-gray-600">{{ website?.length || 0 }} / 50</span>
      <small
        v-if="errors.website"
        id="website-help"
        class="ml-2 text-xs text-red-500"
      >
        {{ errors.website }}
      </small>
    </div>
  </form>
</template>
