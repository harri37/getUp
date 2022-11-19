import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Title from '../components/Title';
import Container from '../components/Container';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';
import {testAlarms, userName} from '../data/testData';
import {NativeModules} from 'react-native';

const {width, height} = Dimensions.get('window');
const {AlarmModule} = NativeModules;

const Home = ({navigation}) => {
  const {theme} = useContext(AppContext);
  const [alarms, setAlarms] = useState(testAlarms);

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
   * Updates alarm array with switched set value for clicked alarm
   * @param {Number} id id of alarm to toggle
   */
  const toggleAlarm = id => {
    //Find alarm object and index in array
    const [toggledAlarm] = alarms.filter(alarm => alarm.id === id);
    const toggledAlarmIndex = alarms.findIndex(alarm => alarm.id === id);

    AlarmModule.createAlarm(
      'Alarm 34',
      new Date().getHours(),
      new Date().getMinutes() + 1,
      [true, false, true, false, true, true, true],
    );

    //Update alarm state
    setAlarms([
      ...alarms.slice(0, toggledAlarmIndex),
      {...toggledAlarm, set: !toggledAlarm.set},
      ...alarms.slice(toggledAlarmIndex + 1),
    ]);
  };

  /**
   * Renders display for single alarm on home page
   * @param {String} time time of alarm
   * @param {Number} id alarm id
   * @returns render for alarm display
   */
  const Alarm = ({time, id, set}) => {
    return (
      <TouchableOpacity
        style={styles.alarmButton}
        onPress={() => navigation.navigate('Edit Alarm', {alarmId: id})}>
        <View style={styles.alarmContainer}>
          <View style={styles.itemContainer}>
            <Text style={styles.alarmTime}>{time}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Switch
              trackColor={{false: 'red', true: 'green'}}
              value={set}
              onChange={() => toggleAlarm(id)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const addSeconds = (date, seconds) =>
    new Date(date.getTime() + seconds * 1000);

  const currentDate = new Date();
  const offset = currentDate.getTimezoneOffset();
  const currentTime = addSeconds(currentDate, offset).getHours();

  return (
    <Container
      children={
        <ScrollView showsVerticalScrollIndicator={false}>
          <Title
            text={
              (currentTime >= 12
                ? currentTime >= 17
                  ? 'Good Evening, '
                  : 'Good Afternoon, '
                : 'Good Morning, ') + userName
            }
          />
          {alarms.map(alarm => (
            <Alarm {...alarm} key={alarm.id} />
          ))}
        </ScrollView>
      }
    />
  );
};

export default Home;
