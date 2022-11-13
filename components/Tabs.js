import React from 'react';
import Home from '../screens/Home';
import EditAlarm from '../screens/EditAlarm';
import Profile from '../screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabIcons} from '../data/icons';
import {Image, View, Dimensions} from 'react-native';

const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');

/**
 * Sets up bottom tab navigator with screens
 * @returns render for bottom tab navigator
 */
const Tabs = () => {
  /**
   * Renders the tab icon for bottom tab navigator
   * @param {Boolean} focused is this tab focused
   * @param {Image} icon icon for tab
   * @returns Tab icon render
   */
  const TabIcon = ({focused, icon}) => (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: width / 10,
          height: width / 10, //This can definitely be done better
          tintColor: focused ? 'green' : 'black', //Colours will change
        }}
      />
    </View>
  );

  /**
   * Sets options for tab
   * @param {Image} icon icon for tab
   * @returns
   */
  const tabOptions = icon => ({
    tabBarIcon: ({focused}) => <TabIcon focused={focused} icon={icon} />,
    tabBarShowLabel: false,
  });

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => tabOptions(tabIcons.homeIcon)}
      />
      <Tab.Screen
        name="EditAlarm"
        component={EditAlarm}
        options={() => tabOptions(tabIcons.plusIcon)}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={() => tabOptions(tabIcons.userIcon)}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
