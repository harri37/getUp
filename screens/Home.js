import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch,
} from 'react-native';
import React, {useContext} from 'react';
import Title from '../components/Title';
import Container from '../components/Container';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';

const {width, height} = Dimensions.get('window');

const alarms = [
  {
    id: 1,
    time: '6:30 AM',
  },
  {
    id: 2,
    time: '7:30 AM',
  },
  {
    id: 3,
    time: '6:30 AM',
  },
  {
    id: 4,
    time: '7:30 AM',
  },
  {
    id: 5,
    time: '6:30 AM',
  },
  {
    id: 6,
    time: '7:30 AM',
  },
];

const Home = () => {
  const {theme} = useContext(AppContext);

  //idk what here is necessary but so long as it works
  const styles = {
    alarmButton: {
      marginTop: 10,
      borderRadius: 20,
      height: height / 8,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: colors[theme].fgColor,
    },
    alarmTime: {
      color: colors[theme].bgColor,
      fontWeight: 'bold',
      fontSize: height / 24,
    },
    alarmContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };

  /**
   * Renders display for single alarm on home page
   * @param {String} time time of alarm
   * @param {Number} id alarm id
   * @returns render for alarm display
   */
  const Alarm = ({time, id}) => {
    return (
      <TouchableOpacity style={styles.alarmButton}>
        <View style={styles.alarmContainer}>
          <View style={styles.itemContainer}>
            <Text style={styles.alarmTime}>{time}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Switch trackColor={{false: 'red', true: 'green'}} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      children={
        <ScrollView showsVerticalScrollIndicator={false}>
          <Title text="Good Morning, Harrison" />
          {alarms.map(alarm => (
            <Alarm id={alarm.id} time={alarm.time} key={alarm.id} />
          ))}
        </ScrollView>
      }
    />
  );
};

export default Home;
