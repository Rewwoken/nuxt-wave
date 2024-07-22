import { createPost } from '~/server/database/post';
import { parseForm } from '~/server/utils/parseForm';

// TODO: refactor spaghetti code
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const replyToId = query.replyToId as string | undefined;

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { fields, files } = await parseForm(event);

  const postData = { text: fields.text?.join(' ') };

  const userId = event.context.userId;
  // eslint-disable-next-line unused-imports/no-unused-vars
  const post = await createPost(userId, replyToId, postData);

  // const fileNames = Object.keys(files);
  // const filePromises = fileNames.map(async (fileName) => {
  //   const file = files[fileName]![0];
  //
  //   const uploadResponse = await uploadFile(file.filepath);
  //
  //   return createMediaFile(userId, post.id, {
  //     url: uploadResponse.url,
  //     providerId: uploadResponse.public_id,
  //   });
  // });

  // await Promise.all(filePromises);

  setResponseStatus(event, 201);
});
