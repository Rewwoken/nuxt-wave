import { createMediaFile } from '~/server/database/mediaFile';
import { createPost } from '~/server/database/post';
import { parseForm } from '~/server/utils/parseForm';
import { uploadToCloudinary } from '~/server/utils/uploadToCloudinary';

// TODO: refactor spaghetti code
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const replyToId = query.replyToId as string | undefined;

  const { fields, files } = await parseForm(event);

  const postData = { text: fields.text?.join(' ') };

  const userId = event.context.userId;
  const post = await createPost(userId, replyToId, postData);

  const fileNames = Object.keys(files);
  const filePromises = fileNames.map(async (fileName) => {
    const file = files[fileName]![0];

    const uploadResponse = await uploadToCloudinary(file.filepath);

    return await createMediaFile(userId, post.id, {
      url: uploadResponse.url,
      providerId: uploadResponse.public_id,
    });
  });

  await Promise.all(filePromises);

  setResponseStatus(event, 201);
});
