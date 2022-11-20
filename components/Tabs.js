import React, {useContext} from 'react';
import Home from '../screens/Home';
import EditAlarm from '../screens/EditAlarm';
import Profile from '../screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabIcons} from '../data/icons';
import {Image, View, Dimensions} from 'react-native';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');

/**
 * Sets up bottom tab navigator with screens
 * @returns render for bottom tab navigator
 */
const Tabs = () => {
  const {theme} = useContext(AppContext);

  /**
   * Renders the tab icon for bottom tab navigator
   * @param {Boolean} focused is this tab focused
   * @param {Image} icon icon for tab
   * @returns Tab icon render
   */
  const TabIcon = ({focused, icon}) => {
    return (
      <View>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: height / 20,
            height: height / 20, //This can definitely be done better
            tintColor: colors.blackColorTranslucentLess, //Colours will change
          }}
        />
      </View>
    );
  };

  /**
   * Sets options for tab
   * @param {Image} icon icon for tab
   * @returns
   */
  const tabOptions = (icon, iconSolid) => ({
    tabBarIcon: ({focused}) => (
      <TabIcon focused={focused} icon={focused ? iconSolid : icon} />
    ),
    tabBarShowLabel: false,
    tabBarStyle: {
      height: height / 12,
      backgroundColor: colors[theme].tabsColor,
      borderTopWidth: 0,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <LinearGradient
            colors={[colors.blueColorDarker, colors.purpleColorLighter]}
            style={{height: '100%'}}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => tabOptions(tabIcons.homeIcon, tabIcons.homeIconSolid)}
      />
      <Tab.Screen
        name="EditAlarm"
        component={EditAlarm}
        options={() => tabOptions(tabIcons.plusIcon, tabIcons.plusIconSolid)}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={() => tabOptions(tabIcons.userIcon, tabIcons.userIconSolid)}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
