export function createTheme(name, componentThemes) {
  const nameIsString = typeof name === 'string';
  const theme = {
    name: nameIsString ? name : 'customized-theme'
  };
  if (nameIsString) {
    if (componentThemes) {
      for (const cTheme of componentThemes) {
        theme[cTheme.name] = cTheme;
      }
    }
  } else {
    for (const cTheme of name) {
      theme[cTheme.name] = cTheme;
    }
  }
  return theme;
}