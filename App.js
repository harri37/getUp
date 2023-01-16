import {useState, React} from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './components/Tabs';
import Settings from './screens/Settings';
import {AppContext} from './helper/AppContext';
import EditAlarm from './screens/EditAlarm';
import StandardDisable from './screens/StandardDisable';
import PageList from './screens/PageList';
import MemoryDisable from './screens/MemoryDisable';
import NFC from './screens/NFC';

/**
 * Sets up navigation and renders the app
 * @returns render for app
 */
const App = () => {
  const [theme, setTheme] = useState(useColorScheme());
  const Stack = createNativeStackNavigator();

  return (
    <AppContext.Provider value={{theme: theme, setTheme: setTheme}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Edit Alarm">
            {props => <EditAlarm {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Page List" component={PageList} />
          <Stack.Screen name="Memory Game" component={MemoryDisable} />
          <Stack.Screen name="Standard Disable" component={StandardDisable} />
          <Stack.Screen name="NFC" component={NFC} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
