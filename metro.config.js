const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

let withExpoRouter;

try {
  ({ withExpoRouter } = require('expo-router/metro'));
} catch {}

module.exports = withExpoRouter ? withExpoRouter(config) : config;
