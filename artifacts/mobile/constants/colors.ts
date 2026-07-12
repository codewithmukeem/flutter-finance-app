/**
 * FinanceFlow design tokens.
 * Premium deep-blue/navy theme inspired by Coinbase & Robinhood.
 * useColors() hook returns the active palette plus radius.
 */
const colors = {
  light: {
    text: "#0F172A",
    tint: "#2563EB",
    background: "#F0F4FF",
    foreground: "#0F172A",
    card: "#FFFFFF",
    cardForeground: "#0F172A",
    primary: "#2563EB",
    primaryForeground: "#FFFFFF",
    secondary: "#EEF2FF",
    secondaryForeground: "#2563EB",
    muted: "#EEF2FF",
    mutedForeground: "#64748B",
    accent: "#10B981",
    accentForeground: "#FFFFFF",
    destructive: "#EF4444",
    destructiveForeground: "#FFFFFF",
    border: "#E2E8F0",
    input: "#E2E8F0",
    // Finance-specific tokens
    income: "#10B981",
    expense: "#EF4444",
    savings: "#F59E0B",
    gradientStart: "#1E3A8A",
    gradientEnd: "#2563EB",
    surface: "#FFFFFF",
    surfaceElevated: "#F8FAFF",
    overlay: "rgba(37,99,235,0.08)",
  },
  dark: {
    text: "#F1F5F9",
    tint: "#60A5FA",
    background: "#050D1F",
    foreground: "#F1F5F9",
    card: "#0D1B33",
    cardForeground: "#F1F5F9",
    primary: "#3B82F6",
    primaryForeground: "#FFFFFF",
    secondary: "#1E2D4A",
    secondaryForeground: "#93C5FD",
    muted: "#0D1B33",
    mutedForeground: "#94A3B8",
    accent: "#10B981",
    accentForeground: "#FFFFFF",
    destructive: "#EF4444",
    destructiveForeground: "#FFFFFF",
    border: "#1E293B",
    input: "#1E293B",
    // Finance-specific tokens
    income: "#10B981",
    expense: "#EF4444",
    savings: "#F59E0B",
    gradientStart: "#1E3A8A",
    gradientEnd: "#1D4ED8",
    surface: "#0D1B33",
    surfaceElevated: "#121F38",
    overlay: "rgba(59,130,246,0.12)",
  },
  radius: 16,
};

export default colors;
