export default {
  expo: {
    name: 'dooboo-ui',
    slug: 'dooboo-ui',
    privacy: 'public',
    platforms: ['ios', 'android', 'web'],
    orientation: 'default',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    assetBundlePatterns: ['**/*'],
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    web: {
      favicon: './assets/icon.png',
    },
  },
};
