const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Drizzle's Expo migrator imports .sql migration files as raw text.
// https://orm.drizzle.team/docs/get-started/expo-new
config.resolver.sourceExts.push('sql');

module.exports = withNativeWind(config, { input: './src/ui/global.css' });
