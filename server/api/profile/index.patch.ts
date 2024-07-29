import { profileSchema } from '~/schemas/profile';
import type { FilesData } from '~/server/database/profile';
import { updateProfile } from '~/server/database/profile';
import { cloudinaryUpload } from '~/server/cloudinary/index';

// TODO: refactor
export default defineEventHandler(async (event) => {
  const { fields, files } = await parseForm(event.node.req);

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
      statusMessage: 'Bad Request',
      message: 'error/fields',
      data: errors,
    });
  }

  const filesData: FilesData = {};
  if (files.image) {
    const image = files.image[0];
    const uploadResponse = await cloudinaryUpload(image.filepath);

    filesData.imageUrl = uploadResponse.url;
    filesData.imageProviderId = uploadResponse.public_id;
  }

  if (files.banner) {
    const banner = files.banner[0];
    const uploadResponse = await cloudinaryUpload(banner.filepath);

    filesData.bannerUrl = uploadResponse.url;
    filesData.bannerProviderId = uploadResponse.public_id;
  }

  const profileData = Object.assign(parseResult.data, filesData);

  const userId = event.context.userId;
  return updateProfile(userId, profileData);
});
