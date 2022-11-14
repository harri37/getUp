import {SafeAreaView, Text} from 'react-native';
import {useContext, React} from 'react';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';

/**
 * Wrapper component for app. Provides padding and background color
 * @param children components to be rendered inside the wrapper
 * @returns render for container
 */
const Container = ({children}) => {
  const {theme} = useContext(AppContext);
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors[theme].bgColor,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        height: '100%',
      }}>
      {children}
    </SafeAreaView>
  );
};

export default Container;
