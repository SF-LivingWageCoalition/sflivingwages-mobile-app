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
