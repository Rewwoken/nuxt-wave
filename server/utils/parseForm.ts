import formidable from 'formidable';
import type { H3Event } from 'h3';

interface ParseFormResult {
	fields: formidable.Fields<string>;
	files: formidable.Files<string>;
}
export async function parseForm(event: H3Event): Promise<ParseFormResult> {
	const form = formidable();

	// ? Potential improvement: handle errors
	const [fields, files] = await form.parse(event.node.req);

	return { fields, files };
}
