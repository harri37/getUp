import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import React, {useContext} from 'react';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';
import {linkIcons} from '../data/icons';

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
    container: {
      marginTop: 10,
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 0,
      backgroundColor: colors[theme].fgColor,
      height: height / 8,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    link: {
      flexDirection: 'row',
    },
    text: {
      color: colors[theme].bgColor,
      fontWeight: 'bold',
      fontSize: height / 24,
      flex: 1,
    },
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate(to)}>
        <Text style={styles.text}>{text}</Text>

        <View
          style={{
            alignSelf: 'flex-end',
            width: 20,
            height: 20,
            marginBottom: 15,
            marginRight: 20,
          }}>
          <Image
            source={linkIcons[theme].chevronRight}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PageLink;
