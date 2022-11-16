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

const {width, height} = Dimensions.get('window');

//Should be replaced with function that grabs alarms from where ever
//we choose to store them later on
const testAlarms = [
  {
    id: 1,
    time: '6:30 AM',
    set: false,
  },
  {
    id: 2,
    time: '7:30 AM',
    set: true,
  },
  {
    id: 3,
    time: '6:30 AM',
    set: false,
  },
];

//should replace with stored username later
const userName = 'Harrison';

const Home = () => {
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
      <TouchableOpacity style={styles.alarmButton}>
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
                ? currentTime > 17
                  ? 'Good Evening, '
                  : 'Good Afternoon, '
                : 'Good Morning, ') + userName
            }
          />
          {alarms.map(alarm => (
            <Alarm
              id={alarm.id}
              time={alarm.time}
              key={alarm.id}
              set={alarm.set}
            />
          ))}
        </ScrollView>
      }
    />
  );
};

export default Home;
