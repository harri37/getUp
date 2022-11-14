import {View, Text} from 'react-native';
import {useContext, React} from 'react';
import {colors, sizes} from '../data/theme';
import {AppContext} from '../helper/AppContext';

const Title = ({text}) => {
  const {theme} = useContext(AppContext);

  const styles = {
    headerStyle: {
      color: colors[theme].fgColor,
      fontSize: sizes.header,
      fontWeight: 'bold',
    },
  };

  return (
    <View>
      <Text style={styles.headerStyle}>{text}</Text>
    </View>
  );
};

export default Title;
