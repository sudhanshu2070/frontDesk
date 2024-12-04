export const applyTheme = (theme: { [key: string]: string }) => {
  for (const [key, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty(key, value);
  }
};