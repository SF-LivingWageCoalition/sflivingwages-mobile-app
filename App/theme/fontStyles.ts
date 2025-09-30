export const fontSize = {
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 36,
} as const;

export type FontSize = keyof typeof fontSize;

export const fontWeight = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export type FontWeight = keyof typeof fontWeight;

// Font family tokens mapped to loaded font names
export const fontFamily = {
  // Body text
  sans: "Roboto_400Regular",
  sansBold: "Roboto_700Bold",
  // Display / headings
  display: "Tomorrow_700Bold",
  displayRegular: "Tomorrow_400Regular",
} as const;

export type FontFamily = keyof typeof fontFamily;

// Reusable text style presets combining font family, size, and weight
export const textStyles = {
  // Headings using Tomorrow (display font)
  h1: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  h3: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  // Body text using Roboto
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
  },
  bodyLarge: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.md,
    fontWeight: fontWeight.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
  },
  // Button text
  button: {
    fontFamily: fontFamily.sansBold,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  buttonSmall: {
    fontFamily: fontFamily.sansBold,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  // Labels and captions
  label: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
  },
} as const;
