import React from 'react';
import {SafeAreaView, useColorScheme, Image} from 'react-native';

import Home from './screens/Home';
import EditAlarm from './screens/EditAlarm';
import Profile from './screens/Profile';

//replace with our colors later
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './components/Tabs';

/**
 * Sets up navigation and renders the app
 * @returns render for app
 */
const App = () => {
  //const isDarkMode = useColorScheme() === 'dark';

  // const styles = {
  //   container: {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //     flex: 1,
  //   },
  // };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
