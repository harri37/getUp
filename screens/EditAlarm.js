import {View, Text} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import Title from '../components/Title';

const EditAlarm = ({route}) => {
  const {alarmId} = typeof route.params === 'undefined' ? '' : route.params;
  return (
    <Container
      children={
        <Title
          text={typeof alarmId === 'undefined' ? 'Create Alarm' : 'Edit Alarm'}
        />
      }
    />
  );
};

export default EditAlarm;
