module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@ui': './src/ui',
            '@features': './src/features',
            '@domain': './src/domain',
            '@data': './src/data',
            '@device': './src/device',
          },
        },
      ],
      // Drizzle's Expo migrator imports .sql files as raw text.
      // https://orm.drizzle.team/docs/get-started/expo-new
      ['inline-import', { extensions: ['.sql'] }],
      'react-native-reanimated/plugin',
    ],
  };
};
