/**
 * Color Tokens - Sistema centralizado de colores
 *
 * Este archivo contiene todos los tokens de color utilizados en la aplicación.
 * Modificar estos valores afectará toda la app de manera consistente.
 */

export const colors = {
  // Primary Colors
  primary: "#00A86B",
  primaryLight: "#e6f7f0",
  primaryDark: "#008558",

  // Secondary Colors
  secondary: "#FF6B35",
  secondaryLight: "#fff3e0",

  // Gradients
  gradient: {
    primary: ["#00C896", "#00A86B"],
    header: ["#00A86B", "#00A86B"],
    homeBackground: ["#00A86B", "#f5f5f5"],
  },

  // Background Colors
  background: {
    primary: "#fff",
    secondary: "#fafafa",
    tertiary: "#f5f5f5",
    card: "#fff",
  },

  // Text Colors
  text: {
    primary: "#1a1a1a",
    secondary: "#333",
    tertiary: "#666",
    quaternary: "#999",
    inverse: "#fff",
  },

  // Border Colors
  border: {
    light: "#f0f0f0",
    medium: "#e0e0e0",
    dark: "#ccc",
  },

  // Status Colors
  status: {
    success: "#4caf50",
    successLight: "#e8f5e9",
    error: "#f44336",
    errorLight: "#ffebee",
    warning: "#ff9800",
    warningLight: "#fff3e0",
    info: "#2196f3",
    infoLight: "#e3f2fd",
  },

  // Semantic Colors
  positive: "#4caf50",
  positiveLight: "#e8f5e9",
  negative: "#f44336",
  negativeLight: "#ffebee",

  // Shadow
  shadow: {
    color: "#000",
    light: "rgba(0, 0, 0, 0.05)",
    medium: "rgba(0, 0, 0, 0.08)",
  },

  // Special Colors
  avatar: "#ffe4d6",
  skeleton: "#E1E9EE",
  skeletonGradient: ["#E1E9EE", "#F2F8FC", "#E1E9EE"],

  // Activity Types
  activity: {
    buy: {
      icon: "#00A86B",
      background: "#e6f7f0",
    },
    sell: {
      icon: "#ff9800",
      background: "#fff3e0",
    },
    deposit: {
      icon: "#4caf50",
      background: "#e8f5e9",
    },
    withdraw: {
      icon: "#f44336",
      background: "#ffebee",
    },
  },

  // Favorites
  favorite: "#FF6B35",
} as const;

export type Colors = typeof colors;
