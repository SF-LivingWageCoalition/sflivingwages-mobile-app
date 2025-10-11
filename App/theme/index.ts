import {
  colors,
  type ColorPalette,
  type ThemeColorsDark,
  type ThemeColorsLight,
} from "./colors";
import {
  fontFamily,
  fontSize,
  textStyles,
  type FontFamily,
  type FontSize,
} from "./fontStyles";

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
export type { ColorPalette, ThemeColorsDark, ThemeColorsLight };

// Export font styles for direct access
export { fontFamily, fontSize, textStyles };
export type { FontFamily, FontSize };

// Default theme (you can change this based on your app's default)
export const defaultTheme = lightTheme;

// Export everything
export default {
  colors,
  fontSize,
  fontFamily,
  textStyles,
  lightTheme,
  darkTheme,
  defaultTheme,
};
