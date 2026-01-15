// Jest setup file

// Only setup React Native mocks if running component tests
const isComponentTest = process.env.JEST_TEST_TYPE === 'component';

if (isComponentTest) {
  require('react-native-gesture-handler/jestSetup');
}

// Mock react-native modules
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock expo modules
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock react-native-paper
jest.mock('react-native-paper', () => ({
  Text: 'Text',
  Button: 'Button',
  Searchbar: 'Searchbar',
  Chip: 'Chip',
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
