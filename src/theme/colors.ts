/**
 * Color Tokens
 *
 */

export const colors = {
  primary: '#123A5E',
  primaryLight: '#5b85abff',
  primaryLightAlpha: 'rgba(30, 78, 121, 0.3)',
  primaryDark: '#0B2A44',
  white: '#ffffff',

  // Secondary Colors
  secondary: '#00A86B',
  secondaryLight: '#e6f7f0',
  secondaryDark: '#008558',

  gradient: {
    primary: ['#1E4E79', '#123A5E'],
    header: ['#123A5E', '#123A5E'],
    homeBackground: ['#123A5E', '#f5f5f5'],
  },

  // Background Colors
  background: {
    primary: '#ffffff',
    secondary: '#fafafa',
    tertiary: '#f5f5f5',
    card: '#ffffff',
  },

  // Text Colors
  text: {
    primary: '#0B1F33',
    secondary: '#333333',
    tertiary: '#666666',
    quaternary: '#999999',
    inverse: '#ffffff',
  },

  // Border Colors
  border: {
    light: '#f0f0f0',
    medium: '#e0e0e0',
    dark: '#cccccc',
  },

  // Status Colors
  status: {
    success: '#00A86B',
    successLight: '#e6f7f0',
    error: '#f44336',
    errorLight: '#ffebee',
    warning: '#ff9800',
    warningLight: '#fff3e0',
    info: '#2196f3',
    infoLight: '#e3f2fd',
  },

  // Semantic Colors
  positive: '#00A86B',
  positiveLight: '#e6f7f0',
  negative: '#f44336',
  negativeLight: '#ffebee',

  // Shadow
  shadow: {
    color: '#000000',
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.08)',
  },

  // Special Colors
  avatar: '#fbcf30ff',
  skeleton: '#E1E9EE',
  skeletonGradient: ['#E1E9EE', '#F2F8FC', '#E1E9EE'],

  // Activity Types
  activity: {
    buy: {
      icon: '#00A86B',
      background: '#e6f7f0',
    },
    sell: {
      icon: '#ff9800',
      background: '#fff3e0',
    },
    deposit: {
      icon: '#00A86B',
      background: '#e6f7f0',
    },
    withdraw: {
      icon: '#f44336',
      background: '#ffebee',
    },
  },

  // Favorites
  favorite: '#00A86B',
} as const;

export type Colors = typeof colors;
