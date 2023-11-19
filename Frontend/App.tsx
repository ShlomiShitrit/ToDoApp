import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './store/store';
import {Provider} from 'react-redux';
import AppEntry from './AppEntry';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppEntry />
      </SafeAreaProvider>
    </Provider>
  );
}
