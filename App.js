
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Toast from 'react-native-toast-message'

// ------ import index.js
import StartPage from './src';

import { StatusBar } from './src/components';
import { primary } from './assets/colors';

const colorModeManager = {
  get: () => { return 'dark' }
}


const App = (props) => {

  return (
    <NativeBaseProvider colorModeManager={colorModeManager}>
      <StatusBar
        backgroundColor={primary}
        barStyle="light-content"
      />

      <StartPage />


      <Toast />
    </NativeBaseProvider>
  )
}


export default App;

