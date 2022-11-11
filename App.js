/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {SafeAreaView, useColorScheme, Image} from 'react-native';

//replace with our colors later
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = {
    container: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./assets/hereWeGoAgain.jpg')}
        style={{height: '50%', width: undefined}}
      />
    </SafeAreaView>
  );
};

export default App;
