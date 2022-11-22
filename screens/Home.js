import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Switch,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Title from '../components/Title';
import Container from '../components/Container';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';
import {userName} from '../data/testData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
// import database from '@react-native-firebase/database';

// console.log('fetching data');
// database()
//   .ref('/test/')
//   .on('value', snapshot => {
//     console.log('data: ', snapshot.val());
//   });
// import {NativeModules} from 'react-native';

const {width, height} = Dimensions.get('window');
//const {AlarmModule} = NativeModules;

const Home = ({navigation}) => {
  const {theme} = useContext(AppContext);
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    /**
     * Grabs existing alarms from async storage
     * This is run everytime we navigate to the homepage
     */
    const getAlarms = async () => {
      try {
        const existingKeys = await AsyncStorage.getAllKeys();
        const existingAlarms = await Promise.all(
          existingKeys.map(key => AsyncStorage.getItem(key)),
        );
        const existingAlarmsJSON = existingAlarms.map(existingAlarm =>
          JSON.parse(existingAlarm),
        );

        setAlarms(existingAlarmsJSON);
        setLoading(false);
      } catch (e) {
        console.warn(e);
      }
    };

    getAlarms();
  }, [isFocused]);

  //idk what here is necessary but so long as it works
  const styles = {
    alarmButton: {
      marginBottom: 10,
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
      {...toggledAlarm, enabled: !toggledAlarm.enabled},
      ...alarms.slice(toggledAlarmIndex + 1),
    ]);
    AsyncStorage.setItem(
      id.toString(),
      JSON.stringify({...toggledAlarm, enabled: !toggledAlarm.enabled}),
    );
  };

  /**
   * Renders display for single alarm on home page
   * @param {JSON} alarm alarm object
   * @returns render for alarm display
   */
  const Alarm = alarm => {
    return loading ? (
      <Text>Loading...</Text>
    ) : (
      <TouchableOpacity
        style={styles.alarmButton}
        onPress={() => navigation.navigate('Edit Alarm', {...alarm})}>
        <View style={styles.alarmContainer}>
          <View style={styles.itemContainer}>
            <Text style={styles.alarmTime}>{`${alarm.hour % 12}:${
              alarm.minute < 10 ? '0' : ''
            }${alarm.minute} ${alarm.hour >= 12 ? 'PM' : 'AM'}`}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Switch
              trackColor={{false: 'red', true: 'green'}}
              value={alarm.enabled}
              onChange={() => toggleAlarm(alarm.id)}
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
          {alarms.length > 0 ? (
            alarms.map(alarm => <Alarm {...alarm} key={alarm.id} />)
          ) : (
            <Text style={{color: colors[theme].fgColor, fontSize: 20}}>
              Hit the '+' icon to start creating alarms!
            </Text>
          )}
        </ScrollView>
      }
    />
  );
};

export default Home;
