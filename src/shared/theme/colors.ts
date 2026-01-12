/**
 * Color Tokens - Sistema centralizado de colores
 *
 * Este archivo contiene todos los tokens de color utilizados en la aplicación.
 * Modificar estos valores afectará toda la app de manera consistente.
 */

export const colors = {
  // Primary Colors
  primary: "#6200ee",
  primaryLight: "#f0e6ff",

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

  // Trading Specific
  buy: "#2196f3",
  sell: "#f44336", // Rojo error para sell

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

  // Brand Specific (Top Movers, etc)
  brand: {
    tesla: {
      icon: "#e82127",
      background: "#ffebee",
    },
    bitcoin: {
      icon: "#f7931a",
      background: "#fff3e0",
    },
    nvidia: {
      icon: "#76b900",
      background: "#e8f5e9",
    },
  },

  // Ticker Colors (for icons without images)
  ticker: {
    dyca: "#FF6B6B",
    ircp: "#4ECDC4",
    garo: "#95E1D3",
    ars: "#7aebffff",
  },

  // Activity Types (Consolidados con colores del sistema)
  activity: {
    buy: {
      icon: "#5e35b1", // Púrpura único para buy
      background: "#e8eaf6",
    },
    sell: {
      icon: "#ff9800", // Naranja warning
      background: "#fff3e0",
    },
    deposit: {
      icon: "#4caf50", // Verde success
      background: "#e8f5e9",
    },
    withdraw: {
      icon: "#f44336", // Rojo error
      background: "#ffebee",
    },
  },

  // Favorites
  favorite: "#ff9800", // Usa warning color para consistencia
} as const;

// Type helper para autocompletado
export type Colors = typeof colors;
