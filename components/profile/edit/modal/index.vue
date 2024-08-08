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
	const hasErrors = computed(() => !!Object.keys(errors.value).length);

	const files = ref<{
		image?: File;
		banner?: File;
	}>({});

	function onFile(key: 'image' | 'banner', file: File) {
		files.value[key] = file;
	}

	const { handleRequest } = useHandleRequest();

	const toast = useToast();
	const { $api } = useNuxtApp();

	const onSubmit = handleSubmit(async (values) => {
		const formData = new FormData();

		const textEntries = Object.entries(values);
		for (const [key, value] of textEntries) {
			formData.set(key, value);
		}
		if (files.value.image) {
			formData.set('image', files.value.image);
		}
		if (files.value.banner) {
			formData.set('banner', files.value.banner);
		}

		await handleRequest(
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

			// ? TODO: add loader toast
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
	<header class="flex items-center px-2 pt-3 mb-2">
		<Button
			icon="pi pi-times"
			severity="contrast"
			pt:root:class="!border-none"
			outlined
			rounded
			@click="$emit('closeModal')"
		/>
		<h2 class="ml-2 text-xl text-surface-950 dark:text-surface-0 font-semibold">
			Edit profile
		</h2>
		<Button
			label="Save"
			severity="contrast"
			pt:root:class="px-8 ml-auto"
			:loading="isSubmitting"
			:disabled="hasErrors"
			rounded
			@click="onSubmit"
		/>
	</header>
	<ProfileEditModalBanner @on-file="onFile" />
	<ProfileEditModalImage @on-file="onFile" />
	<!-- TODO: handle empty fields case -->
	<form
		class="flex flex-col p-3 gap-y-8"
		novalidate
	>
		<div class="relative flex flex-col">
			<InputText
				v-model="name"
				type="text"
				name="name"
				size="large"
				autocomplete="name"
				placeholder="Name"
				aria-describedby="name-help"
				pt:root:class="py-4 group"
				:maxlength="50"
				:invalid="!!errors.name"
			/>
			<span class="absolute z-10 text-sm text-muted-color top-1 right-4">{{ name?.length || 0 }} / 50</span>
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
				name="bio"
				autocomplete="off"
				placeholder="Bio"
				aria-describedby="bio-help"
				:maxlength="160"
				:invalid="!!errors.bio"
				:auto-resize="true"
				pt:root:class="py-4 resize-none"
			/>
			<span class="absolute z-10 text-sm text-muted-color top-1 right-4">{{ bio?.length || 0 }} / 160</span>
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
				name="location"
				size="large"
				autocomplete="country-name"
				placeholder="Location"
				aria-describedby="location-help"
				pt:root:class="py-4"
				:maxlength="30"
				:invalid="!!errors.location"
			/>
			<span class="absolute z-10 text-sm text-muted-color top-1 right-4">{{ location?.length || 0 }} / 30</span>
			<small
				v-if="errors.location"
				id="location-help"
				class="absolute ml-2 text-xs text-red-500 -bottom-5"
			>
				{{ errors.location }}
			</small>
		</div>
		<div class="relative flex flex-col gap-y-1">
			<InputText
				v-model="website"
				type="text"
				name="website"
				size="large"
				autocomplete="url"
				placeholder="Website"
				aria-describedby="website-help"
				pt:root:class="py-4"
				:maxlength="50"
				:invalid="!!errors.website"
			/>
			<span class="absolute z-10 text-sm text-muted-color top-1 right-4">{{ website?.length || 0 }} / 50</span>
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
