import {
	PROFILE_BIO_MAX_LENGTH,
	PROFILE_LOCATION_MAX_LENGTH,
	PROFILE_NAME_MAX_LENGTH,
	PROFILE_WEBSITE_MAX_LENGTH,
} from '~/shared/profile/constants';

interface ProfileField {
	is: 'input' | 'textarea';
	type: string;
	name: string;
	placeholder: string;
	autocomplete: string;
	maxLength: number;
}

export const profileEditFields: ProfileField[] = [
	{
		is: 'input',
		type: 'text',
		name: 'name',
		placeholder: 'Name',
		autocomplete: 'name',
		maxLength: PROFILE_NAME_MAX_LENGTH,
	},
	{
		is: 'textarea',
		type: 'text',
		name: 'bio',
		placeholder: 'Bio',
		autocomplete: 'new-password',
		maxLength: PROFILE_BIO_MAX_LENGTH,
	},
	{
		is: 'input',
		type: 'text',
		name: 'location',
		placeholder: 'Location',
		autocomplete: 'country-name',
		maxLength: PROFILE_LOCATION_MAX_LENGTH,
	},
	{
		is: 'input',
		type: 'text',
		name: 'website',
		placeholder: 'Website',
		autocomplete: 'url',
		maxLength: PROFILE_WEBSITE_MAX_LENGTH,
	},
];
