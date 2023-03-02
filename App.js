import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';

import { useFonts } from 'expo-font';
const App = () => {
  const [loaded] = useFonts({
    HindSiliguriLight: require('./assets/fonts/HindSiliguri-Light.ttf'),
    HindSiliguriMedium: require('./assets/fonts/HindSiliguri-Medium.ttf'),
    HindSiliguriRegular: require('./assets/fonts/HindSiliguri-Regular.ttf'),
    HindSiliguriSemiBold: require('./assets/fonts/HindSiliguri-SemiBold.ttf'),
    HindSiliguriBold : require('./assets/fonts/HindSiliguri-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
};

export default App;
