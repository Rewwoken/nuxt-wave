import type { IncomingMessage } from 'node:http';
import formidable from 'formidable';

export async function parseForm(req: IncomingMessage) {
	const form = formidable();

	try {
		const [fields, files] = await form.parse(req);

		return { fields, files };
	}
	catch (error) {
		console.error('Error parsing request form:', error);
		throw serverError(400, 'invalid-form');
	}
}
