import type { Fields } from 'formidable';

export function joinFormFields(formFields: Fields<string>) {
	const joinedFields: Record<string, string> = {};

	const fieldEntries = Object.entries(formFields);
	for (const [fieldName, fieldValue] of fieldEntries) {
		if (fieldValue === undefined) {
			continue;
		}

		joinedFields[fieldName] = joinFormField(fieldValue);
	}

	return joinedFields;
}

export function joinFormField(fieldValue: string[]) {
	return fieldValue.join('');
}
