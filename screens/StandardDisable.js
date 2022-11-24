import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import {colors} from '../data/theme';
import {AppContext} from '../helper/AppContext';

const StandardDisable = () => {
  const {theme} = useContext(AppContext);

  const [myState, setMyState] = useState('hello');

  useEffect(() => {
    console.log('re render');
  }, [myState]);

  const styles = {
    button: {
      backgroundColor: colors[theme].fgColor,
      borderRadius: 20,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    buttonText: {
      color: colors[theme].bgColor,
      fontWeight: 'bold',
      fontSize: 20,
    },
  };

  return (
    <Container
      children={
        <>
          <Title text={myState} />

          <TouchableOpacity
            onPress={() => {
              setMyState('hi');
              //console.log('alarm snoozed');
              //snooze alarm
            }}
            style={{
              ...styles.button,
              backgroundColor: colors[theme].bgColor,
              borderWidth: 3,
              borderColor: colors[theme].fgColor,
            }}>
            <Text style={{...styles.buttonText, color: colors[theme].fgColor}}>
              Snooze
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setMyState('bye');
              //console.log('alarm stopped');
              //stop alarm
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </>
      }
    />
  );
};

export default StandardDisable;
