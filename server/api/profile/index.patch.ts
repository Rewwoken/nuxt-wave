import { parseForm } from '~/server/utils/parseForm';
import { profileSchema } from '~/schemas/profile';
import type { FilesData } from '~/server/database/profile';
import { updateProfile } from '~/server/database/profile';
import { uploadFile } from '~/server/cloudinary/uploadFile';

export default defineEventHandler(async (event) => {
  const { fields, files } = await parseForm(event);

  const formattedFields: Record<string, string> = {};

  const fieldsEntries = Object.entries(fields);
  for (const [name, field] of fieldsEntries) {
    if (field) {
      formattedFields[name] = field.join(' ');
    }
  }

  const parseResult = profileSchema.safeParse(formattedFields);
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;

    throw createError({
      statusCode: 400,
      message: 'Invalid text fields!',
      data: errors,
    });
  }

  const filesData: FilesData = {};
  if (files.image) {
    const image = files.image[0];
    const uploadResponse = await uploadFile(image.filepath);

    filesData.imageUrl = uploadResponse.url;
    filesData.imageProviderId = uploadResponse.public_id;
  }

  if (files.banner) {
    const banner = files.banner[0];
    const uploadResponse = await uploadFile(banner.filepath);

    filesData.bannerUrl = uploadResponse.url;
    filesData.bannerProviderId = uploadResponse.public_id;
  }

  const profileData = Object.assign(parseResult.data, filesData);

  const userId = event.context.userId;
  return updateProfile(userId, profileData);
});
