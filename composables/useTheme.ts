export default () => {
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
    else {
      theme.value = 'light';
    }
  }

  return { theme, toggleTheme };
};
