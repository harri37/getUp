import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useContext} from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';

/**
 * Create / edit alarm page. Conditionally renders based on route.
 *
 * (Not yet implemented) if this page is navigated to from an existing alarm
 * fields will be prefilled with existing alarm data.
 *
 * @param {Object} route react navigation route
 * @returns render for create / edit alarm page
 */
const EditAlarm = ({route}) => {
  const [type, setType] = useState('Select Type');
  const [sound, setSound] = useState('Select Sound');
  const {theme} = useContext(AppContext);

  const options = ['Standard', 'NFC', 'Payment'];
  const sounds = ['Standard', 'Radio', 'Siren'];

  /**
   * Creates a drop down picker component and saves chosen option
   * in useState variable
   *
   * To create an inital select message, initialise the useState variable
   * with this message
   * @param {Array} data array of options to choose from
   * @param {Text} value useState variable to store value
   * @param {Function} setValue setter function for useState value
   * @returns render for drop down picker
   */
  const DropdownPicker = ({data, value, setValue}) => {
    const [shown, setShown] = useState(false);

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
        <>
          <Title
            text={
              typeof alarmId === 'undefined' ? 'Create Alarm' : 'Edit Alarm'
            }
          />
          <DropdownPicker data={options} value={type} setValue={setType} />
          <DropdownPicker data={sounds} value={sound} setValue={setSound} />
        </>
      }
    />
  );
};

export default EditAlarm;
