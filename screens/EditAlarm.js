import {View, Text, TouchableOpacity, ScrollView, NativeModules} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {AlarmModule} = NativeModules;

/**
 * Create / edit alarm page. Conditionally renders based on route.
 *
 * (Not yet implemented) if this page is navigated to from an existing alarm
 * fields will be prefilled with existing alarm data.
 *
 * @param {Object} route react navigation route
 * @param {Object} naviagation app navigation object
 * @returns render for create / edit alarm page
 */
const EditAlarm = ({route, navigation}) => {
  const [type, setType] = useState('Select Type');
  const [sound, setSound] = useState('Select Sound');
  const [showTypes, setShowTypes] = useState(false);
  const [showSounds, setShowSounds] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeSet, setTimeSet] = useState(false);
  const {theme} = useContext(AppContext);

  const options = ['Standard', 'NFC', 'Payment'];
  const sounds = ['Standard', 'Radio', 'Siren'];

  const styles = {
    text: {
      color: colors[theme].bgColor,
      paddingTop: 15,
      paddingBottom: 15,
    },
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 10,

      borderRadius: 20,
      paddingLeft: 20,
      backgroundColor: colors[theme].fgColor,
    },
  };

  //Reset field entries when navigating away from screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowSounds(false);
      setShowTypes(false);
      setType('Select Type');
      setSound('Select Sound');
      setTimeSet(false);
      setTime(new Date());
    });
    return unsubscribe;
  }, [navigation]);

  /**
   * Saves an alarm to phone using async storage and navigates user to home page.
   * Will not attempt to save an alarm if not all fields are filled in
   */
  const saveAlarm = async () => {
    console.log('saving alarm');
    if (type !== 'Select Type' && sound !== 'Select Sound' && timeSet) {
      try {
        //Find the old largest alarm id
        const existingKeys = await AsyncStorage.getAllKeys();
        const existingAlarms = await Promise.all(
          existingKeys.map(key => AsyncStorage.getItem(key)),
        );
        const existingAlarmsJSON = existingAlarms.map(existingAlarm =>
          JSON.parse(existingAlarm),
        );
        const oldMaxId =
          existingAlarmsJSON.length > 0
            ? existingAlarmsJSON.reduce((max, current) =>
                max.id > current.id ? max : current,
              ).id
            : 0;

        //Save alarm
        const alarmJSON = JSON.stringify({
          type: type,
          sound: sound,
          id: oldMaxId + 1,
          hour: time.getHours(),
          minute: time.getMinutes(),
          days: [false, false, false, false, false, false, false],
          enabled: true,
        });
        await AsyncStorage.setItem((oldMaxId + 1).toString(), alarmJSON);

        AlarmModule.createAlarm(
          oldMaxId + 1,
          time.getHours(),
          time.getMinutes(),
          [false, true, true, true, false, false, false],
        );

        navigation.navigate('Home');
      } catch (e) {
        console.warn(error);
      }
    } else {
      //shaking animations ideally
      console.log('please fill in all fields');
    }
  };

  /**
   * Creates a drop down picker component and saves chosen option
   * in useState variable
   *
   * To create an inital select message, initialise the useState variable
   * with this message
   * @param {Array} data array of options to choose from
   * @param {Text} value useState variable to store value
   * @param {Function} setValue setter function for useState value
   * @param {Boolean} shown state variable for showing dropdown
   * @param {Function} setShown setter function for shown
   * @returns render for drop down picker
   */
  const DropdownPicker = ({data, value, setValue, shown, setShown}) => {
    /**
     * Creates a single item within drop down list. Clicking
     * on this component will set the passed in state variable to
     * the component value
     * @param {Text} value value of dropdown item
     * @returns render for a drop down item
     */
    const DropdownItem = ({value}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setValue(value);
            setShown(false);
          }}>
          <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => setShown(!shown)}>
        <Text style={styles.text}>{value}</Text>
        {shown && data.map(item => <DropdownItem value={item} key={item} />)}
      </TouchableOpacity>
    );
  };

  //Check if we have come from an existing alarm
  const {alarmId} = typeof route.params === 'undefined' ? '' : route.params;

  return (
    <Container
      children={
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}>
          <View style={{justifyContent: 'flex-start'}}>
            <Title
              text={
                typeof alarmId === 'undefined' ? 'Create Alarm' : 'Edit Alarm'
              }
            />
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                setShowTimePicker(true);
              }}>
              <Text style={styles.text}>
                {timeSet
                  ? `${time.getHours() % 12}:${
                      time.getMinutes() < 10 ? '0' : ''
                    }${time.getMinutes()} ${
                      time.getHours() >= 12 ? 'PM' : 'AM'
                    }`
                  : 'Select Time'}
              </Text>
            </TouchableOpacity>
            <DatePicker
              modal
              title="Select Time"
              mode="time"
              display="spinner"
              date={time}
              open={showTimePicker}
              onConfirm={date => {
                setShowTimePicker(false);
                setTime(date);
                setTimeSet(true);
              }}
              onCancel={() => {
                setShowTimePicker(false);
              }}
            />
            <DropdownPicker
              data={options}
              shown={showTypes}
              setShown={setShowTypes}
              value={type}
              setValue={setType}
            />
            <DropdownPicker
              data={sounds}
              shown={showSounds}
              setShown={setShowSounds}
              value={sound}
              setValue={setSound}
            />
          </View>

          <View style={{justifyContent: 'flex-end', marginBottom: 20}}>
            <TouchableOpacity
              onPress={() => saveAlarm()}
              style={{
                ...styles.container,
                paddingLeft: 0,
              }}>
              <Text
                style={{
                  ...styles.text,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      }
    />
  );
};

export default EditAlarm;
