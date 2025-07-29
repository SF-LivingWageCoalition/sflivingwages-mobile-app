/**
 * Colors: Red (primary), Blue (secondary), White, and Yellow (warnings)
 */

const palette = {
  // Red shades (primary brand color)
  red50: "#fef2f2",
  red100: "#fee2e2",
  red200: "#fecaca",
  red300: "#fca5a5",
  red400: "#f87171",
  red500: "#ef4444",
  red600: "#d31623", // Main brand red
  red700: "#c91a1a",
  red800: "#b91c1c",
  red900: "#991b1b",

  // Blue shades (secondary/accent color)
  blue50: "#eff6ff",
  blue100: "#dbeafe",
  blue200: "#bfdbfe",
  blue300: "#93c5fd",
  blue400: "#60a5fa",
  blue500: "#3b82f6",
  blue600: "#0088dc", // Main blue
  blue700: "#1d4ed8",
  blue800: "#1e40af",
  blue900: "#1e3a8a",

  // Gray shades (neutral colors)
  gray50: "#f9fafb",
  gray100: "#f5f5f5", // Light background
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#555555", // Medium text
  gray700: "#374151",
  gray800: "#333333", // Dark text
  gray900: "#111827",

  // Yellow shades (warning/caution)
  yellow50: "#fffbeb",
  yellow100: "#fef3c7",
  yellow200: "#fde68a",
  yellow300: "#fcd34d",
  yellow400: "#fbbf24",
  yellow500: "#f59e0b",
  yellow600: "#d97706",
  yellow700: "#b45309",
  yellow800: "#92400e",
  yellow900: "#78350f",

  // Pure colors
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
} as const;

// Semantic color definitions for light theme
const lightTheme = {
  // Primary brand colors (red-based)
  primary: palette.red600,
  primaryLight: palette.red500,
  primaryDark: palette.red700,
  primaryContainer: palette.red100,
  onPrimary: palette.white,
  onPrimaryContainer: palette.red800,

  // Secondary colors (blue-based)
  secondary: palette.blue600,
  secondaryLight: palette.blue500,
  secondaryDark: palette.blue700,
  secondaryContainer: palette.blue100,
  onSecondary: palette.white,
  onSecondaryContainer: palette.blue800,

  // Background colors
  background: palette.white,
  backgroundSecondary: palette.gray100,
  surface: palette.white,
  surfaceVariant: palette.gray50,
  surfaceContainer: palette.gray100,
  onBackground: palette.black,
  onSurface: palette.black,
  onSurfaceVariant: palette.gray600,

  // Text colors
  textPrimary: palette.black,
  textSecondary: palette.gray600,
  textTertiary: palette.gray500,
  textDisabled: palette.gray400,
  textOnPrimary: palette.white,
  textOnSecondary: palette.white,

  // Border and divider colors
  border: palette.gray200,
  borderLight: palette.gray100,
  divider: palette.gray200,
  outline: palette.gray300,
  outlineVariant: palette.gray200,

  // Status colors
  success: palette.blue600, // Using blue for success since no green needed
  successContainer: palette.blue100,
  onSuccess: palette.white,
  onSuccessContainer: palette.blue700,

  error: palette.red600,
  errorContainer: palette.red100,
  onError: palette.white,
  onErrorContainer: palette.red700,

  warning: palette.yellow500,
  warningContainer: palette.yellow100,
  onWarning: palette.black,
  onWarningContainer: palette.yellow700,

  info: palette.blue600,
  infoContainer: palette.blue100,
  onInfo: palette.white,
  onInfoContainer: palette.blue700,

  // Interactive states
  ripple: `${palette.gray500}20`, // 20% opacity
  hover: `${palette.gray500}08`, // 8% opacity
  focus: `${palette.red600}12`, // 12% opacity
  pressed: `${palette.gray500}12`, // 12% opacity
  selected: `${palette.red600}08`, // 8% opacity
  disabled: palette.gray300,
  disabledContainer: palette.gray100,

  // Shadow colors
  shadow: `${palette.black}15`, // 15% opacity
  shadowLight: `${palette.black}08`, // 8% opacity
  elevation: `${palette.black}12`, // 12% opacity
} as const;

// Dark theme colors
const darkTheme = {
  // Primary brand colors (red-based)
  primary: palette.red500,
  primaryLight: palette.red400,
  primaryDark: palette.red600,
  primaryContainer: palette.red800,
  onPrimary: palette.red900,
  onPrimaryContainer: palette.red100,

  // Secondary colors (blue-based)
  secondary: palette.blue400,
  secondaryLight: palette.blue300,
  secondaryDark: palette.blue500,
  secondaryContainer: palette.blue800,
  onSecondary: palette.blue900,
  onSecondaryContainer: palette.blue100,

  // Background colors
  background: palette.gray900,
  backgroundSecondary: palette.gray800,
  surface: palette.gray900,
  surfaceVariant: palette.gray800,
  surfaceContainer: palette.gray800,
  onBackground: palette.gray100,
  onSurface: palette.gray100,
  onSurfaceVariant: palette.gray400,

  // Text colors
  textPrimary: palette.gray100,
  textSecondary: palette.gray400,
  textTertiary: palette.gray500,
  textDisabled: palette.gray600,
  textOnPrimary: palette.red900,
  textOnSecondary: palette.blue900,

  // Border and divider colors
  border: palette.gray700,
  borderLight: palette.gray800,
  divider: palette.gray700,
  outline: palette.gray600,
  outlineVariant: palette.gray700,

  // Status colors
  success: palette.blue400,
  successContainer: palette.blue800,
  onSuccess: palette.blue900,
  onSuccessContainer: palette.blue100,

  error: palette.red400,
  errorContainer: palette.red800,
  onError: palette.red900,
  onErrorContainer: palette.red100,

  warning: palette.yellow400,
  warningContainer: palette.yellow700,
  onWarning: palette.yellow900,
  onWarningContainer: palette.yellow100,

  info: palette.blue400,
  infoContainer: palette.blue800,
  onInfo: palette.blue900,
  onInfoContainer: palette.blue100,

  // Interactive states
  ripple: `${palette.gray400}20`, // 20% opacity
  hover: `${palette.gray400}08`, // 8% opacity
  focus: `${palette.red400}12`, // 12% opacity
  pressed: `${palette.gray400}12`, // 12% opacity
  selected: `${palette.red400}08`, // 8% opacity
  disabled: palette.gray600,
  disabledContainer: palette.gray800,

  // Shadow colors
  shadow: `${palette.black}40`, // 40% opacity
  shadowLight: `${palette.black}20`, // 20% opacity
  elevation: `${palette.black}30`, // 30% opacity
} as const;

// Type definitions
export type ColorPalette = typeof palette;
export type ThemeColorsLight = typeof lightTheme;
export type ThemeColorsDark = typeof darkTheme;

// Export the color system
export const colors = {
  palette,
  light: lightTheme,
  dark: darkTheme,
} as const;

// Default export for convenience
export default colors;
