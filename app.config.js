import 'dotenv/config';

export default {
  expo: {
    name: 'ICC',
    slug: 'icc-starter',
    privacy: 'public',
    platforms: ['ios', 'android'],
    version: '0.15.0',
    orientation: 'portrait',
    icon: './assets/flame.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#0E1736'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    extra: {
      apiKey: "AIzaSyAgiUOz0l15COrdCGQFvMhyD8n53vOYUmY",
      authDomain: "icc-app-c2871.firebaseapp.com",
      projectId: "icc-app-c2871",
      storageBucket: "icc-app-c2871.appspot.com",
      messagingSenderId:"720448287936",
      appId: "1:720448287936:web:96c257fa3d1edef888e925"
    }
  }
};
