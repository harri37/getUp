import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';

/**
 * Component to render link to a page in app theme
 * @param {Text} text name of page to navigate to
 * @param {Text} to address of page
 * @param {Navigator} navigation app navigation object
 * @returns
 */
const PageLink = ({text, to, navigation}) => {
  const {width, height} = Dimensions.get('window');
  const {theme} = useContext(AppContext);

  const styles = {
    link: {
      marginTop: 10,
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: colors[theme].fgColor,
      height: height / 8,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    text: {
      color: colors[theme].bgColor,
      fontWeight: 'bold',
      fontSize: height / 24,
    },
  };

  return (
    <TouchableOpacity
      style={styles.link}
      onPress={() => navigation.navigate(to)}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PageLink;
