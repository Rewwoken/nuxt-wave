// FIXME: eliminate the need for explicit plugin type declaration
import type { $Fetch, NitroFetchRequest } from 'nitropack';

declare module '#app' {
	interface NuxtApp {
		$api: $Fetch<unknown, NitroFetchRequest>;
	}
}
