import {
  colors,
  type ThemeColorsLight,
  type ThemeColorsDark,
  type ColorPalette,
} from "./colors";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textStyles,
  type FontSize,
  type FontWeight,
  type FontFamily,
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
export type { ThemeColorsLight, ThemeColorsDark, ColorPalette };

// Export font styles for direct access
export { fontSize, fontWeight, fontFamily, textStyles };
export type { FontSize, FontWeight, FontFamily };

// Default theme (you can change this based on your app's default)
export const defaultTheme = lightTheme;

// Export everything
export default {
  colors,
  fontSize,
  fontWeight,
  fontFamily,
  textStyles,
  lightTheme,
  darkTheme,
  defaultTheme,
};
