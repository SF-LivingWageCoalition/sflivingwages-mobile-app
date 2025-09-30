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
  // Roboto (body/UI text)
  roboto: "Roboto_400Regular",           // Regular weight
  robotoMedium: "Roboto_500Medium",      // Medium weight (if needed)
  robotoBold: "Roboto_700Bold",          // Bold weight
  
  // Tomorrow (display/headings)
  tomorrow: "Tomorrow_400Regular",       // Regular weight
  tomorrowBold: "Tomorrow_700Bold",      // Bold weight
  
  // Semantic aliases for common use cases
  body: "Roboto_400Regular",             // Default body text
  bodyBold: "Roboto_700Bold",            // Bold body text
  heading: "Tomorrow_700Bold",           // Default headings
  headingRegular: "Tomorrow_400Regular", // Regular headings
} as const;

export type FontFamily = keyof typeof fontFamily;

// Optional: Keep fontWeight for rare cases where you need numeric values
// (e.g., when working with third-party components that expect it)
export const fontWeight = {
  normal: "400",
  medium: "500",
  bold: "700",
} as const;

export type FontWeight = keyof typeof fontWeight;

// Reusable text style presets combining font family and size
// Note: fontWeight is optional since each font file already has its weight baked in
export const textStyles = {
  // Headings using Tomorrow (display font)
  h1: {
    fontFamily: fontFamily.heading,      // Tomorrow Bold
    fontSize: fontSize.xxl,
  },
  h2: {
    fontFamily: fontFamily.heading,      // Tomorrow Bold
    fontSize: fontSize.xl,
  },
  h3: {
    fontFamily: fontFamily.heading,      // Tomorrow Bold
    fontSize: fontSize.lg,
  },
  // Body text using Roboto
  body: {
    fontFamily: fontFamily.body,         // Roboto Regular
    fontSize: fontSize.sm,
  },
  bodyLarge: {
    fontFamily: fontFamily.body,         // Roboto Regular
    fontSize: fontSize.md,
  },
  bodySmall: {
    fontFamily: fontFamily.body,         // Roboto Regular
    fontSize: fontSize.xs,
  },
  // Button text (uses bold Roboto)
  button: {
    fontFamily: fontFamily.bodyBold,     // Roboto Bold
    fontSize: fontSize.md,
  },
  buttonSmall: {
    fontFamily: fontFamily.bodyBold,     // Roboto Bold
    fontSize: fontSize.sm,
  },
  // Labels and captions
  label: {
    fontFamily: fontFamily.robotoMedium, // Roboto Medium
    fontSize: fontSize.sm,
  },
  caption: {
    fontFamily: fontFamily.body,         // Roboto Regular
    fontSize: fontSize.xs,
  },
} as const;
