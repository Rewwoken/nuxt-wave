export function useTheme() {
	const themeCookie = useCookie('theme');

	const theme = useState('theme', () => {
		return themeCookie.value ?? 'light';
	});

	watch(theme, (value) => {
		themeCookie.value = value;
	});

	function toggleTheme() {
		if (theme.value === 'light') {
			theme.value = 'dark';
		}
		else if (theme.value === 'dark') {
			theme.value = 'light';
		}
		else {
			theme.value = 'dark';
		}
	}

	return { theme, toggleTheme };
};
