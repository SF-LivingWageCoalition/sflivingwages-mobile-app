import {
  colors,
  type ThemeColorsLight,
  type ThemeColorsDark,
  type ColorPalette,
} from "./colors";

// Theme interface
export interface Theme {
  colors: ThemeColorsLight | ThemeColorsDark;
  isDark: boolean;
}

// Create theme objects
export const lightTheme: Theme = {
  colors: colors.light,
  isDark: false,
};

export const darkTheme: Theme = {
  colors: colors.dark,
  isDark: true,
};

// Export colors for direct access
export { colors };
export type { ThemeColorsLight, ThemeColorsDark, ColorPalette };

// Default theme (you can change this based on your app's default)
export const defaultTheme = lightTheme;

// Export everything
export default {
  colors,
  lightTheme,
  darkTheme,
  defaultTheme,
};
