const palette = {
  neutral900: "#FFFFFF",
  neutral800: "#F4F2F1",
  neutral700: "#D7CEC9",
  neutral600: "#B6ACA6",
  neutral500: "#978F8A",
  neutral400: "#564E4A",
  neutral300: "#3C3836",
  neutral200: "#191015",
  neutral100: "#000000",

  primary600: "#E6E7F2",
  primary500: "#C5C7E3",
  primary400: "#9093CD",
  primary300: "#5C61B3",
  primary200: "#3B4488",
  primary100: "#0F175F",

  secondary500: "#ECEDF2",
  secondary400: "#D4D6E3",
  secondary300: "#A2A6BC",
  secondary200: "#717595",
  secondary100: "#464A6E",

  accent500: "#FFF4E6",
  accent400: "#FFE4BC",
  accent300: "#FFD192",
  accent200: "#FFBE68",
  accent100: "#FF9F3E",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
