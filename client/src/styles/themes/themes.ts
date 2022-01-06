/**
 * @file Themes for the project, currently only default theme
 * @author Kevin Xu
 */
const defaultTheme = {
  black: 'rgba(0, 0, 0, 1)',
  grey: 'rgba(48, 48, 49, 1)',
  montserrat: 'Montserrat',
};

export type Theme = typeof defaultTheme;

export const themes = {
  default: defaultTheme,
};
