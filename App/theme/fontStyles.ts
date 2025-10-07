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

// Font family tokens mapped to loaded font names
// Each weight is a separate font file in React Native
export const fontFamily = {
  roboto: "Roboto_400Regular",
  robotoMedium: "Roboto_500Medium",
  robotoBold: "Roboto_700Bold",

  nunito: "Nunito_400Regular",
  nunitoSemiBold: "Nunito_600SemiBold",
  nunitoBold: "Nunito_700Bold",

  body: "Roboto_400Regular",
  bodyBold: "Roboto_700Bold",
  heading: "Nunito_700Bold",
  headingRegular: "Nunito_400Regular",
  headingSemiBold: "Nunito_600SemiBold",
} as const;

export type FontFamily = keyof typeof fontFamily;

// Keep fontWeight for rare cases where we need numeric values
export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export type FontWeight = keyof typeof fontWeight;

// Reusable text style presets combining font family and size
export const textStyles = {
  // Headings using Nunito (display font - rounded, matches brand style)
  h1: {
    fontFamily: fontFamily.heading, // Nunito Bold
    fontSize: fontSize.xxl,
  },
  h2: {
    fontFamily: fontFamily.heading, // Nunito Bold
    fontSize: fontSize.xl,
  },
  h3: {
    fontFamily: fontFamily.heading, // Nunito Bold
    fontSize: fontSize.lg,
  },
  // Body text using Roboto
  body: {
    fontFamily: fontFamily.body, // Roboto Regular
    fontSize: fontSize.sm,
  },
  bodyBold: {
    fontFamily: fontFamily.bodyBold, // Roboto Bold
    fontSize: fontSize.sm,
  },
  bodyLarge: {
    fontFamily: fontFamily.body, // Roboto Regular
    fontSize: fontSize.md,
  },
  bodyLargeBold: {
    fontFamily: fontFamily.bodyBold, // Roboto Bold
    fontSize: fontSize.md,
  },
  bodyLargeMedium: {
    fontFamily: fontFamily.robotoMedium, // Roboto Medium
    fontSize: fontSize.md,
  },
  bodySmall: {
    fontFamily: fontFamily.body, // Roboto Regular
    fontSize: fontSize.xs,
  },
  bodySmallBold: {
    fontFamily: fontFamily.bodyBold, // Roboto Bold
    fontSize: fontSize.xs,
  },
  // Button text (uses bold Roboto)
  button: {
    fontFamily: fontFamily.bodyBold, // Roboto Bold
    fontSize: fontSize.md,
  },
  buttonSmall: {
    fontFamily: fontFamily.bodyBold, // Roboto Bold
    fontSize: fontSize.sm,
  },
  // Labels and captions
  label: {
    fontFamily: fontFamily.robotoMedium, // Roboto Medium
    fontSize: fontSize.sm,
  },
  labelBold: {
    fontFamily: fontFamily.bodyBold, // Roboto Bold
    fontSize: fontSize.sm,
  },
  caption: {
    fontFamily: fontFamily.body, // Roboto Regular
    fontSize: fontSize.xs,
  },
} as const;
