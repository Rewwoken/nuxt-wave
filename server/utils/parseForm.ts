import type { IncomingMessage } from 'node:http';
import formidable from 'formidable';

export async function parseForm(req: IncomingMessage) {
  const form = formidable();

  // ? Potential improvement: handle errors
  const [fields, files] = await form.parse(req);

  return { fields, files };
}
